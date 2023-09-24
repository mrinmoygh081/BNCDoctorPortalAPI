const responseToClient = require("../../helper/response");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { tryCatch } = require("../../utils/tryCatch");
const prismaConnector = require("../../prisma/prismaConnector");
const { resSend } = require("../../helper/resSend");

// POST -> /api/v1/appointments/appointments
exports.getAppoints = async (req, res) => {
  const { booking_date } = req.body;

  let sql = `
            SELECT t2.p_id, t2.patient_id,t1.appointment_id, t1.booking_date, t2.name, t2.phone, t2.age, t2.sex, t2.address, t2.appointment_type
            FROM appointments as t1 
            INNER JOIN patients as t2 ON t1.p_id = t2.p_id
            WHERE LEFT(t1.booking_date, 10) = '${booking_date}'
            `;
  const result = await prismaConnector.$queryRawUnsafe(sql);
  resSend(res, true, 200, "Appointments List!", result, null);
};

// POST -> /api/v1/appointments/appointments/new
exports.addAppointsNew = async (req, res) => {
  const {
    booking_date,
    patient_id,
    name,
    phone,
    age,
    sex,
    address,
    appointment_type,
  } = req.body;

  let sql = `SELECT * FROM patients WHERE patient_id= '${patient_id}'`;
  let patientArr = await prismaConnector.$queryRawUnsafe(sql);
  let appoint_res = null;

  if (patientArr && patientArr.length > 0) {
    // old patient
    resSend(
      res,
      false,
      200,
      "Patient ID is already added! This should be an old patient!",
      appoint_res,
      null
    );
  } else {
    // new patient
    const result = await prismaConnector.patients.create({
      data: {
        patient_id: patient_id,
        name: name,
        phone: phone,
        age: age,
        sex: sex,
        address: address,
        appointment_type: appointment_type,
      },
    });
    if (result) {
      appoint_res = await prismaConnector.appointments.create({
        data: {
          p_id: result.p_id,
          booking_date: booking_date,
        },
      });
    }
    resSend(
      res,
      true,
      200,
      "Appointments with patient info added!",
      appoint_res,
      null
    );
  }
};

// POST -> /api/v1/appointments/appointments/old
exports.addAppointsOld = async (req, res) => {
  const { booking_date, patient_id } = req.body;

  let sql = `SELECT * FROM patients WHERE patient_id= '${patient_id}'`;
  let patientArr = await prismaConnector.$queryRawUnsafe(sql);
  let appoint_res = null;

  if (patientArr && patientArr.length > 0) {
    let p_id = patientArr[0]?.p_id;
    appoint_res = await prismaConnector.appointments.create({
      data: {
        p_id: p_id,
        booking_date: booking_date,
      },
    });
    resSend(
      res,
      true,
      200,
      "Appointment for old patient added!",
      appoint_res,
      null
    );
  } else {
    resSend(
      res,
      false,
      200,
      "Patient ID is not found! This should be a new patient!",
      appoint_res,
      null
    );
  }
};

// POST -> /api/v1/appointments/getFamilyHistory
exports.getFamilyHistory = async (req, res) => {
  const { p_id } = req.body;

  let sql = `SELECT * FROM familyhistory WHERE p_id= '${p_id}'`;
  let patientArr = await prismaConnector.$queryRawUnsafe(sql);

  if (patientArr && patientArr.length > 0) {
    // Patient History
    resSend(res, true, 200, "Patient Family History!", patientArr, null);
  } else {
    // Patient History not present
    resSend(
      res,
      false,
      200,
      "Patient Family History is not present!",
      null,
      null
    );
  }
};

// POST -> /api/v1/appointments/addFamilyHistory/
exports.addFamilyHistory = async (req, res) => {
  const {
    p_id,
    p_infective,
    p_noninfective,
    p_surgical,
    p_obs_gynae,
    p_parity,
    m_infective,
    m_noninfective,
    m_surgical,
    m_obs_gynae,
    m_parity,
  } = req.body;

  let sql = `SELECT * FROM familyhistory WHERE p_id= '${p_id}'`;
  let patientArr = await prismaConnector.$queryRawUnsafe(sql);

  if (patientArr && patientArr.length > 0) {
    // Patient History Updated
    let sql = `UPDATE familyhistory SET
      p_infective='${p_infective}',
      p_noninfective='${p_noninfective}',
      p_surgical='${p_surgical}',
      p_obs_gynae='${p_obs_gynae}',
      p_parity='${p_parity}',
      m_infective='${m_infective}',
      m_noninfective='${m_noninfective}',
      m_surgical='${m_surgical}',
      m_obs_gynae='${m_obs_gynae}',
      m_parity='${m_parity}'
     WHERE p_id= '${p_id}'`;
    let patientArr = await prismaConnector.$queryRawUnsafe(sql);
    resSend(
      res,
      true,
      200,
      "Patient Family History Updated!",
      patientArr,
      null
    );
  } else {
    // Patient History Add for the first time
    const result = await prismaConnector.familyhistory.create({
      data: {
        p_id,
        p_infective,
        p_noninfective,
        p_surgical,
        p_obs_gynae,
        p_parity,
        m_infective,
        m_noninfective,
        m_surgical,
        m_obs_gynae,
        m_parity,
      },
    });
    resSend(res, true, 200, "Patient Family History Add!", result, null);
  }
};

// POST -> /api/v1/appointments/getPersonalHistory
exports.getPersonalHistory = async (req, res) => {
  const { p_id } = req.body;

  let sql = `SELECT * FROM personalhistory WHERE p_id= '${p_id}'`;
  let patientArr = await prismaConnector.$queryRawUnsafe(sql);

  if (patientArr && patientArr.length > 0) {
    // Patient History
    resSend(res, true, 200, "Patient Personal History!", patientArr, null);
  } else {
    // Patient History not present
    resSend(
      res,
      false,
      200,
      "Patient Personal History is not present!",
      null,
      null
    );
  }
};

// POST -> /api/v1/appointments/addPersonalHistory/
exports.addPersonalHistory = async (req, res) => {
  const {
    p_id,
    infective_history,
    injuries,
    vaccination,
    surgical,
    addiction,
    marital_status,
    num_child,
  } = req.body;

  let sql = `SELECT * FROM personalhistory WHERE p_id= '${p_id}'`;
  let patientArr = await prismaConnector.$queryRawUnsafe(sql);

  if (patientArr && patientArr.length > 0) {
    // Patient History Updated
    let sql = `UPDATE personalhistory SET
      infective_history='${infective_history}',
      injuries='${injuries}',
      vaccination='${vaccination}',
      surgical='${surgical}',
      addiction='${addiction}',
      marital_status='${marital_status}',
      num_child='${num_child}'
     WHERE p_id= '${p_id}'`;
    let patientArr = await prismaConnector.$queryRawUnsafe(sql);
    resSend(
      res,
      true,
      200,
      "Patient Personal History Updated!",
      patientArr,
      null
    );
  } else {
    // Patient History Add for the first time
    const result = await prismaConnector.personalhistory.create({
      data: {
        p_id,
        infective_history,
        injuries,
        vaccination,
        surgical,
        addiction,
        marital_status,
        num_child,
      },
    });
    resSend(res, true, 200, "Patient Personal History Add!", result, null);
  }
};

// POST -> /api/v1/appointments/getCravings
exports.getCravings = async (req, res) => {
  const { p_id } = req.body;

  let sql = `SELECT * FROM cravings WHERE p_id= '${p_id}'`;
  let patientArr = await prismaConnector.$queryRawUnsafe(sql);

  if (patientArr && patientArr.length > 0) {
    // Patient History
    resSend(res, true, 200, "Patient cravings!", patientArr, null);
  } else {
    // Patient History not present
    resSend(res, false, 200, "Patient cravings is not present!", null, null);
  }
};

// POST -> /api/v1/appointments/addCravings
exports.addCravings = async (req, res) => {
  const { p_id, cravings } = req.body;

  let sql = `SELECT * FROM cravings WHERE p_id= '${p_id}'`;
  let patientArr = await prismaConnector.$queryRawUnsafe(sql);

  if (patientArr && patientArr.length > 0) {
    // Patient History Updated
    let sql = `UPDATE cravings SET
     cravings='${cravings}'
     WHERE p_id= '${p_id}'`;
    let patientArr = await prismaConnector.$queryRawUnsafe(sql);
    resSend(res, true, 200, "Patient cravings Updated!", patientArr, null);
  } else {
    // Patient History Add for the first time
    const result = await prismaConnector.cravings.create({
      data: {
        p_id,
        cravings,
      },
    });
    resSend(res, true, 200, "Patient cravings Add!", result, null);
  }
};

// POST -> /api/v1/appointments/getGeneralities
exports.getGeneralities = async (req, res) => {
  const { p_id } = req.body;

  let sql = `SELECT * FROM generalities WHERE p_id= '${p_id}'`;
  let patientArr = await prismaConnector.$queryRawUnsafe(sql);

  if (patientArr && patientArr.length > 0) {
    // Patient History
    resSend(res, true, 200, "Patient Generalities!", patientArr, null);
  } else {
    // Patient History not present
    resSend(
      res,
      false,
      200,
      "Patient Generalities is not present!",
      null,
      null
    );
  }
};

// POST -> /api/v1/appointments/addGeneralities
exports.addGeneralities = async (req, res) => {
  const {
    p_id,
    sweat,
    skin,
    teeth_gum,
    tongue,
    mental,
    thirst,
    dreams,
    thermal,
  } = req.body;

  let sql = `SELECT * FROM generalities WHERE p_id= '${p_id}'`;
  let patientArr = await prismaConnector.$queryRawUnsafe(sql);

  if (patientArr && patientArr.length > 0) {
    // Patient History Updated
    let sql = `UPDATE generalities SET
      sweat='${sweat}',
      skin='${skin}',
      teeth_gum='${teeth_gum}',
      tongue='${tongue}',
      mental='${mental}',
      thirst='${thirst}',
      dreams='${dreams}',
      thermal='${thermal}'
     WHERE p_id= '${p_id}'`;
    let patientArr = await prismaConnector.$queryRawUnsafe(sql);
    resSend(res, true, 200, "Patient Generalities Updated!", patientArr, null);
  } else {
    // Patient History Add for the first time
    const result = await prismaConnector.generalities.create({
      data: {
        p_id,
        sweat,
        skin,
        teeth_gum,
        tongue,
        mental,
        thirst,
        dreams,
        thermal,
      },
    });
    resSend(res, true, 200, "Patient Generalities Add!", result, null);
  }
};

// POST -> /api/v1/appointments/addCaseHistory
exports.addCaseHistory = async (req, res) => {
  const { p_id, date, system, image, remarks } = req.body;

  let sql = `SELECT * FROM casehistory WHERE p_id= '${p_id}'`;
  let caseHis = await prismaConnector.$queryRawUnsafe(sql);

  if (caseHis && caseHis.length > 0) {
    // Case History Updated
    let sql = `UPDATE casehistory SET
      date='${date}',
      system='${system}',
      image='${image}',
      remarks='${remarks}'
      WHERE p_id= '${p_id}'`;
    let caseHis = await prismaConnector.$queryRawUnsafe(sql);
    resSend(res, true, 200, "Case History Updated!", caseHis, null);
  } else {
    // Case History Add for the first time
    const result = await prismaConnector.casehistory.create({
      data: {
        p_id,
        date,
        system,
        image,
        remarks,
      },
    });
    resSend(res, true, 200, "Case History Added!", result, null);
  }
};
