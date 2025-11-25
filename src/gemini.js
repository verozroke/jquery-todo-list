function requestGemini(promptText, callback) {
  $.ajax({
    url: 'http://localhost:3000/api/gemini',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      contents: [{ parts: [{ text: promptText }] }],
    }),
    success: function (res) {
      const output = res?.candidates?.[0]?.content?.parts?.[0]?.text || ''
      callback(output)
    },
    error: function (xhr) {
      callback(null, xhr.responseText)
    },
  })
}

function handleGeminiPrompt(output, err) {
  try {
    const generatedTasks = JSON.parse(cleanAIJson(output))
    generatedTasks.forEach((genTask) => addTask(genTask.text))
    $('#gemini-input').val('')
  } catch (error) {
    console.error('Could not parse JSON data from Gemini')
    console.error(error)
    console.error(err)
  }
}

function getGeminiPrompt(userPromptText) {
  return `
    YOUR MISSION IS TO CREATE .JSON CODE OF FRESHLY GENERATED TASKS WHICH ARE IN THE TYPE OF
    type Task = {
      text: string
      doned: boolean
    }


    Task.doned is ALWAYS false.


    CREATE VARIOUS TASKS ACCORDING TO USER PROMPT TO YOU
    USER JUST SAY WHAT TASK HE WANTS OR PROVIDE THE CONTEXT.
    HERE IS USER PROMPT: "${userPromptText}"

    IF USER DIDN'T PROVIDED TASK COUNT THE DEFAULT IS 10 TASKS

    YOUR OUTPUT MUST BE IN .json CODE WITHOUT ANY OTHER TEXT. ONLY JSON CODE THAT I CAN PARSE IN MY APPLICATION.

    DO NOT USE ANY FORMATTING OR TEXT. ONLY THE JSON CODE THAT I WILL PASS
    Respond ONLY with pure JSON array. No text. No markdown. No explanation."
  `
}
