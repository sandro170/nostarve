import { Canvas, CanvasRenderingContext2D, createCanvas, registerFont } from "canvas";
import { Utils } from "../modules/utils";

const CAPTCHA_AMOUNT = 20;
const CAPTCHA_SIZE = 140;
const DISTORTION_FACTOR = 0.7;
const FONT_SIZE = 22;
const characters = ["2", "6"];
let charactersImages: { [key: string]: ImageData } = {};

registerFont("./Sevillana-Regular.ttf", {
    family: "Sevillana"
});

export const captcha: { text: string; buffer: Buffer }[] = [];
let i = 0;

export function updateCaptcha() {
    captcha[i++] = createCaptcha();
    if (i >= CAPTCHA_AMOUNT) i = 0;
}

for (let char of characters) {
    charactersImages[char] = getCharacter(char, (Math.random() - 0.5) * DISTORTION_FACTOR);
}

updateCaptcha();

function generateText(length: number): string {
    let text = "";
    for (let i = 0; i < length; i++) {
        text += characters[Math.floor(Math.random() * characters.length)];
    }
    return text;
}

function createCaptcha(): { text: string; buffer: Buffer } {
    const canvas = createCanvas(CAPTCHA_SIZE, CAPTCHA_SIZE / 2);
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.textAlign = "start";
    context.textBaseline = "middle";
    context.fillStyle = "black";

    const text = generateText(4);

    // Skip adding background noise
    // context.putImageData(generateNoiseImageData(canvas, context), 0, 0);

    const charWidth = canvas.width / text.length;

    for (let i = 0; i < text.length; i++) {
        const xPosition = i * charWidth + Utils.random_clamp(-2, 2);
        const yPosition = Utils.random_clamp(0, canvas.height - FONT_SIZE);

        context.putImageData(
            charactersImages[text[i]],
            xPosition,
            yPosition
        );
    }

    return {
        text,
        buffer: canvas.toBuffer("image/png", { compressionLevel: 9 })
    };
}

function getCharacter(character: string, distortion: number): ImageData {
    const canvas = createCanvas(FONT_SIZE - 4, FONT_SIZE + 4);
    const context = canvas.getContext("2d");
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "black";
    context.font = `${FONT_SIZE}px 'Sevillana'`;

    context.transform(1, distortion, distortion / 2, 1, distortion / 2, distortion / 2);
    context.fillText(character, (FONT_SIZE - 4) / 2, (FONT_SIZE + 4) / 2);

    const imageData = context.getImageData(0, 0, FONT_SIZE - 4, FONT_SIZE + 4);

    // Ensure no noise is added
    for (let i = 0; i < imageData.data.length; i += 4) {
        if (imageData.data[i + 3] > 20) { // Text pixels
            imageData.data[i] = 0;
            imageData.data[i + 1] = 0;
            imageData.data[i + 2] = 0;
            imageData.data[i + 3] = 255;
        }
    }

    return imageData;
}

// This function is now redundant, as we no longer use it for background noise
function generateNoiseImageData(canvas: Canvas, context: CanvasRenderingContext2D): ImageData {
    const noiseImageData = context.createImageData(canvas.width, canvas.height);
    for (let i = 0; i < noiseImageData.data.length; i += 4) {
        // Skip generating noise
        continue;
    }
    return noiseImageData;
}