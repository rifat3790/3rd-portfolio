const mongoose = require('mongoose');
require('dotenv').config();

const Project = require('./models/Project');
const Skill = require('./models/Skill');

const { PROJECTS, SKILLS } = require('./portfolioData');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Project.deleteMany({});
    await Skill.deleteMany({});
    console.log('Cleared DB');

    const projectsToInsert = PROJECTS.map((p, index) => {
      // Use the existing id, or index if it's missing or string
      return { ...p, id: typeof p.id === 'number' ? p.id : index + 1 };
    });
    await Project.insertMany(projectsToInsert);
    console.log(`Inserted ${projectsToInsert.length} projects`);

    await Skill.insertMany(SKILLS);
    console.log(`Inserted ${SKILLS.length} skills`);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
  }
}

seed();
