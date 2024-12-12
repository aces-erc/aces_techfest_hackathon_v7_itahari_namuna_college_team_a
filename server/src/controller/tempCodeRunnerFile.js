const Medical_Report = [
  {
    day: 1,
    blood_pressure: {
      SBP: 120,
      DBP: 80,
      HP: 72,
    },
  },
  {
    day: 2,
    blood_pressure: {
      SBP: 125,
      DBP: 85,
      HP: 75,
    },
    suger_level: 105,
    description: "Feeling slightly fatigued today, but no significant discomfort. Mild headache.",
  },
  {
    day: 3,
    blood_pressure: {
      SBP: 118,
      DBP: 78,
      HP: 70,
    },
    suger_level: 98,
    description: "Feeling better, energy levels are back to normal. No major symptoms today.",
  },
  {
    day: 4,
    blood_pressure: {
      SBP: 130,
      DBP: 85,
      HP: 80,
    },
    suger_level: 110,
    description: "Slight dizziness today. Blood pressure was a bit high in the morning.",
  },
  {
    day: 5,
    blood_pressure: {
      SBP: 115,
      DBP: 75,
      HP: 70,
    },
    suger_level: 102,
    description: "Feeling great, no issues with blood pressure or sugar level today. Active and energetic.",
  },
]

for (let data of Medical_Report) {
  console.log(data)

}
