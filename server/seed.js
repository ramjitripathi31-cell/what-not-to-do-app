const mongoose = require("mongoose");
const Tip = require("./models/Tip");

const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/whatnotdb";

const seedData = [
  {
    title: "Never Share OTP with Anyone",
    description: "Banks and UPI apps never ask for your OTP. Sharing it can lead to fraud.",
    category: "Finance",
    sources: ["https://www.rbi.org.in/", "https://www.npci.org.in/"]
  },
  {
    title: "Do Not Sign Blank Cheques",
    description: "Leaving signed cheques blank is risky and can be misused for large withdrawals.",
    category: "Finance",
    sources: ["https://www.sbi.co.in/"]
  },
  {
    title: "Don’t Bribe Traffic Police",
    description: "Offering bribes is a punishable offence under Indian law. Always ask for an e-challan instead.",
    category: "Legal",
    sources: ["https://morth.nic.in/"]
  },
  {
    title: "Avoid Self-Medication with Antibiotics",
    description: "Taking antibiotics without prescription can cause resistance and health issues.",
    category: "Health",
    sources: ["https://www.icmr.nic.in/"]
  },
  {
    title: "Don’t Ignore Cyberbullying",
    description: "Report online harassment on the National Cyber Crime portal instead of ignoring it.",
    category: "Legal",
    sources: ["https://cybercrime.gov.in/"]
  }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected ✅");
    await Tip.deleteMany({});
    console.log("Cleared old tips ❌");
    await Tip.insertMany(seedData);
    console.log("Inserted seed tips 🌱");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("Error seeding DB ❌", err);
    mongoose.disconnect();
  });
