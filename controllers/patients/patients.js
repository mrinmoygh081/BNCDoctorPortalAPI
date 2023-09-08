const responseToClient = require("../../helper/response");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { tryCatch } = require("../../utils/tryCatch");
const prismaConnector = require("../../prisma/prismaConnector");
const { resSend } = require("../../helper/resSend");

// GET -> /patients
exports.getPatients = async (req, res, next) => {
  const result = await prismaConnector.$queryRawUnsafe(
    "SELECT * FROM patients"
  );
  resSend(res, true, 200, "Patients List!", result, null);
};

// GET -> /patients/:patient_id
exports.getPatientsById = async (req, res, next) => {
  let { id } = req.params;
  const result = await prismaConnector.$queryRawUnsafe(
    `SELECT t1.p_id, t1.patient_id, t1.name, t1.phone, t1.age, t1.sex, t1.address,
    t2.p_infective, t2.p_noninfective, t2.p_surgical, t2.p_obs_gynae, t2.p_parity, t2.m_infective, t2.m_noninfective, t2.m_surgical, t2.m_obs_gynae, t2.m_parity,
    t3.infective_history, t3.injuries, t3.vaccination, t3.surgical, t3.addiction, t3.marital_status, t3.num_child,
    t4.cravings,
    t5.sweat, t5.skin, t5.teeth_gum, t5.tongue, t5.mental, t5.thirst, t5.dreams
    FROM patients as t1 
    LEFT JOIN familyhistory as t2 ON t1.p_id = t2.p_id
    LEFT JOIN personalhistory as t3 ON t1.p_id = t3.p_id
    LEFT JOIN cravings as t4 ON t1.p_id = t4.p_id
    LEFT JOIN generalities as t5 ON t1.p_id = t5.p_id
    WHERE t1.p_id = ${id}`
  );
  resSend(res, true, 200, "Patients List!", result, null);
};

// POST -> /api/v1/patients/addReporting
exports.addReporting = async (req, res) => {
  const { p_id, date, system, image, remarks } = req.body;
  console.log(p_id, date, system, image, remarks);

  let sql = `SELECT * FROM casereporing WHERE p_id= '${p_id}'`;
  let caseHis = await prismaConnector.$queryRawUnsafe(sql);

  if (caseHis && caseHis.length > 0) {
    // Case Reporting Updated
    let sql = `UPDATE casereporing SET
      date='${date}',
      system='${system}',
      image='${image}',
      remarks='${remarks}'
      WHERE p_id= '${p_id}'`;
    let caseHis = await prismaConnector.$queryRawUnsafe(sql);
    resSend(res, true, 200, "Case Reporting Updated!", caseHis, null);
  } else {
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
  }
};
