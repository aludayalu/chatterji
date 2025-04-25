const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/{model}:streamGenerateContent?alt=sse&key="

export async function streamGeminiResponse(conversation, onUpdate, onEnd) {
    var id=Math.random().toString()
    window.localStorage.setItem("readerId", id)
    const response = await fetch(endpoint.replace("{model}", localStorage.getItem("usingPro") == "true" ? "gemini-2.5-pro-exp-03-25" : "gemini-2.5-flash-preview-04-17") + window.localStorage.getItem("geminiAPIKey"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: conversation,
            generationConfig: {
                temperature: 0.7,
                thinkingConfig: {
                    thinkingBudget: 10240
                }
            }
        })
    });
    
    if (!response.body) {
        throw new Error("Readable stream not supported in this environment");
    }
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    function splitByNewlineAndEveryN(str) {
        return str
            .split(/(\n)/) // Split by newline and keep it as a token
            .flatMap(part => {
                if (part === '\n') return [part];
                return part.match(/.{1,50}/g) || [''];
            });
    }
    
    while (true) {
        if (window.localStorage.getItem("readerId")!=id) {
            reader.cancel("User stopped the action")
            return
        }
        const { done, value } = await reader.read();
        if (done) break;
    
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(line => line.trim().startsWith('data: '));
    
        for (const line of lines) {
            const json = JSON.parse(line.replace(/^data: /, ''));
            const text = json.candidates?.[0]?.content?.parts?.[0]?.text;

            if (text) {
                var splittedText = splitByNewlineAndEveryN(text)
                for (let index = 0; index < splittedText.length; index++) {
                    const element = splittedText[index];
                    onUpdate(element)
                }
            }
        }
    }
    onEnd()
}