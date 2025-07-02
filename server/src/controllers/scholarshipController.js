import pool from "../database/db.js";
import prisma from "../prismaClient.js";

// export const getScholarships = async (req, res) => {
//   const data = `
//     SELECT 
//    c.name AS country_name, 
//    u.name AS university_name, 
//    s.name AS scholarship_name,
//    s.degree,s.eligible,s.amount,s.deadline,s.link,s.id
//    FROM  
//    country c JOIN university u ON c.id=u.country_id 
//    JOIN scholarship s ON u.id=s.university_id order by id
// `;
//   const result = await pool.query(data);
//   console.log(result);
//   res.json(result);
// };
export const getScholarships = async (req, res) => {
  try {
    const scholarships = await prisma.scholarship.findMany({
      orderBy: { id: "asc" },
      include: {
        university: {
          include: {
            country: true,
          },
        },
      },
    });

    const formatted = scholarships.map((s) => ({
      country_name: s.university?.country?.name,
      university_name: s.university?.name,
      scholarship_name: s.name,
      degree: s.degree,
      eligible: s.eligible,
      amount: s.amount,
      deadline: s.deadline,
      link: s.link,
      id: s.id,
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch scholarships" });
  }
};


// export const getScholarshipById = async (req, res) => {
//   const id = req.params.id;
//   console.log(id);
//   const result = `
//       SELECT 
//       c.name AS country_name, 
//       u.name AS university_name, 
//       s.name AS scholarship_name,
//       s.degree,s.eligible,s.amount,s.deadline,s.link,s.criteria
//       FROM  
//       country c JOIN university u ON c.id=u.country_id 
//       JOIN scholarship s ON u.id=s.university_id
//       WHERE s.id=$1`;
//   const resul = await pool.query(result, [id]);
//   console.log(resul);
//   res.json(resul);
// };

export const getScholarshipById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const s = await prisma.scholarship.findUnique({
      where: { id },
      include: {
        university: {
          include: {
            country: true,
          },
        },
      },
    });

    if (!s) {
      return res.status(404).json({ error: "Scholarship not found" });
    }

    const response = {
      country_name: s.university?.country?.name,
      university_name: s.university?.name,
      scholarship_name: s.name,
      degree: s.degree,
      eligible: s.eligible,
      amount: s.amount,
      deadline: s.deadline,
      link: s.link,
      criteria: s.criteria,
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch scholarship by ID" });
  }
};


// export const getScholarshipByFilter = async (req, res) => {
//   const { country, university, degree } = req.query;
//   console.log(country, university, degree);
//   const result = `SELECT 
//     c.name AS country_name, 
//     u.name AS university_name, 
//     s.name AS scholarship_name,
//     s.degree,s.eligible,s.amount,s.deadline,s.link
//     FROM country c 
//     JOIN university u ON c.id = u.country_id  
//     JOIN scholarship s ON u.id = s.university_id where c.name=$1 and u.name=$2 and s.degree=$3`;
//   const resu = await pool.query(result, [country, university, degree]);

//   res.json(resu);
// };

export const getScholarshipByFilter = async (req, res) => {
  const { country, university, degree } = req.query;

  try {
    const filtered = await prisma.scholarship.findMany({
      where: {
        degree: String(degree),
        university: {
          name: String(university),
          country: {
            name: String(country),
          },
        },
      },
      include: {
        university: {
          include: {
            country: true,
          },
        },
      },
    });

    const formatted = filtered.map((s) => ({
      country_name: s.university?.country?.name,
      university_name: s.university?.name,
      scholarship_name: s.name,
      degree: s.degree,
      eligible: s.eligible,
      amount: s.amount,
      deadline: s.deadline,
      link: s.link,
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to filter scholarships" });
  }
};
