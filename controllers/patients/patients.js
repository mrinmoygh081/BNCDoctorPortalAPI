const responseToClient = require("../../helper/response");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { tryCatch } = require("../../utils/tryCatch");
const prismaConnector = require("../../prisma/prismaConnector");
const { resSend } = require("../../helper/resSend");

// GET -> /api/v1/patients
exports.getPatients = async (req, res, next) => {
  const result = await prismaConnector.$queryRawUnsafe(
    "SELECT * FROM patients"
  );
  resSend(res, true, 200, "Patients List!", result, null);
};

// GET -> /api/v1/patients/:patient_id
exports.getPatientsById = async (req, res, next) => {
  let { id } = req.params;
  const result = await prismaConnector.$queryRawUnsafe(
    `SELECT t1.p_id, t1.patient_id, t1.name, t1.phone, t1.age, t1.sex, t1.address, t1.appointment_type,
    t2.p_infective, t2.p_noninfective, t2.p_surgical, t2.p_obs_gynae, t2.p_parity, t2.m_infective, t2.m_noninfective, t2.m_surgical, t2.m_obs_gynae, t2.m_parity,
    t3.infective_history, t3.injuries, t3.vaccination, t3.surgical, t3.addiction, t3.marital_status, t3.num_child,
    t4.cravings,
    t5.sweat, t5.skin, t5.teeth_gum, t5.tongue, t5.mental, t5.thirst, t5.dreams, t5.thermal,
    t6.date as ch_date, t6.system as ch_system, t6.image as ch_image, t6.remarks as ch_remarks
    FROM patients as t1 
    LEFT JOIN familyhistory as t2 ON t1.p_id = t2.p_id
    LEFT JOIN personalhistory as t3 ON t1.p_id = t3.p_id
    LEFT JOIN cravings as t4 ON t1.p_id = t4.p_id
    LEFT JOIN generalities as t5 ON t1.p_id = t5.p_id
    LEFT JOIN casehistory as t6 ON t1.p_id = t6.p_id
    WHERE t1.p_id = ${id}`
  );
  resSend(res, true, 200, "Patients List!", result, null);
};

// POST -> /api/v1/patients/getReportings
exports.getReportings = async (req, res, next) => {
  const { p_id } = req.body;
  const result = await prismaConnector.$queryRawUnsafe(
    `SELECT * FROM casereporing WHERE p_id = ${p_id} ORDER BY date DESC`
  );
  resSend(res, true, 200, "Patients List!", result, null);
};

// POST -> /api/v1/patients/addReporting
exports.addReporting = async (req, res) => {
  const { p_id, date, system, image, remarks } = req.body;

  if (p_id) {
    // Case Reporting Add for the first time
    const result = await prismaConnector.casereporing.create({
      data: {
        p_id,
        date,
        system,
        image,
        remarks,
      },
    });
    resSend(res, true, 200, "Case Reporting Added!", result, null);
  } else {
    resSend(res, false, 200, "p_id is missing!", null, null);
  }
};

exports.editReporting = async (req, res) => {
  const { cr_id, date, system, image, remarks } = req.body;
  // Check new Patient Id is already in the database
  const result = await prismaConnector.$queryRawUnsafe(
    `SELECT * FROM casereporing WHERE cr_id = '${cr_id}'`
  );
  if (result.length > 0) {
    const response = await prismaConnector.$queryRawUnsafe(
      `UPDATE casereporing 
    SET date = '${date}', 
    system = '${system}', 
    image = '${image}', 
    remarks = '${remarks}'
    WHERE cr_id = '${cr_id}'`
    );
    resSend(
      res,
      true,
      200,
      "Case Reporting updated successfully!",
      response,
      null
    );
  } else {
    resSend(res, false, 200, "Case Reporting not found!", result, null);
  }
};

// POST -> /api/v1/patients/deleteReporting
exports.deleteReporting = async (req, res) => {
  const { cr_id } = req.body;
  const result = await prismaConnector.$queryRawUnsafe(
    `DELETE FROM casereporing WHERE cr_id = ${cr_id}`
  );
  resSend(res, true, 200, "The item is deleted!", result, null);
};

// POST -> /api/v1/patients/editPatientId
exports.editPatientId = async (req, res) => {
  const { p_id, new_patient_id } = req.body;

  // Check new Patient Id is already in the database
  const result = await prismaConnector.$queryRawUnsafe(
    `SELECT * FROM patients WHERE patient_id = '${new_patient_id}'`
  );
  if (result.length > 0) {
    resSend(res, false, 200, "Patient Id is already Assigned!", result, null);
  } else {
    const response = await prismaConnector.$queryRawUnsafe(
      `UPDATE patients SET patient_id = '${new_patient_id}' WHERE p_id = '${p_id}'`
    );
    resSend(res, true, 200, "Patient id updated successfully!", response, null);
  }
};

// POST -> /api/v1/patients/editPatientInfo
exports.editPatientInfo = async (req, res) => {
  const { p_id, name, phone, sex, age, address, appointment_type } = req.body;

  // Check new Patient Id is already in the database
  const result = await prismaConnector.$queryRawUnsafe(
    `SELECT * FROM patients WHERE p_id = '${p_id}'`
  );
  if (result.length > 0) {
    const response = await prismaConnector.$queryRawUnsafe(
      `UPDATE patients 
      SET name = '${name}', 
      phone = '${phone}', 
      sex = '${sex}', 
      age = '${age}', 
      address = '${address}', 
      appointment_type = '${appointment_type}' 
      WHERE p_id = '${p_id}'`
    );
    resSend(
      res,
      true,
      200,
      "Patient Info updated successfully!",
      response,
      null
    );
  } else {
    resSend(res, false, 200, "Patient not found!", result, null);
  }
};
