const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const image = new Image();
image.crossOrigin = "anonymous";

function generateMeme() {
    const template = document.getElementById("template").value;
    const topText = document.getElementById("topText").value;
    const bottomText = document.getElementById("bottomText").value;
    const color = document.getElementById("textColor").value;

    image.src = template;

    image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0);

        ctx.fillStyle = color;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.font = "bold 40px Arial";
        ctx.textAlign = "center";

        // Top Text
        ctx.fillText(topText, canvas.width / 2, 50);
        ctx.strokeText(topText, canvas.width / 2, 50);

        // Bottom Text
        ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
        ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
    };
}

function downloadMeme() {
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL();
    link.click();
}