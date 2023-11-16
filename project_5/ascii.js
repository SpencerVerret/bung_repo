//Spencer Verret, INFX 370, ascii.js for project 5

"use strict";

$("#animationText").val(BLANK); 
$("#animationText").val(JUGGLER);
$("#animationText").val(EXERCISE); 
$("#animationText").val(BIKE);
$("#animationText").val(DIVE); 

const animations = {
    BLANK: "",
    EXERCISE: "Frames for Exercise animation...",
    JUGGLER: "Frames for Juggler animation...",
    BIKE: "Frames for Bike animation...",
    DIVE: "Frames for Dive animation..."
};

//Function Call
$(document).ready(function () {
    // Initialize
    $("#startButton").on("click", startAnimation);
    $("#stopButton").on("click", stopAnimation);
    $("#animationSelect").on("change", changeAnimation);
    $("#fontSizeSelect").on("change", changeFontSize);
    $("#turboCheckbox").on("change", toggleTurbo);

    // Initial state
    disableButton("#stopButton");
    disableSelect("#animationSelect");
    enableButton("#turboCheckbox");
    // Set initial animation
    changeAnimation();
});

let animationInterval;
let currentFrame = 0;

//Starts Animation
function startAnimation() {
    enableButton("#stopButton");
    disableSelect("#animationSelect");
    enableButton("#turboCheckbox");

    const frames = $("#animationText").val().split("=====\n"); 

    // Reset currentFrame
    currentFrame = 0;

    // Use setInterval to update the animation
    animationInterval = setInterval(function () {
        if (currentFrame >= frames.length) {
            currentFrame = 0; // Loop back to the beginning
        }

        $("#animationText").val(frames[currentFrame]);
        currentFrame++;
    }, calculateInterval()); // Adjust the interval based on turbo state
}

//Stop Animation
function stopAnimation() {
    disableButton("#stopButton");
    enableSelect("#animationSelect");
    enableButton("#turboCheckbox");

    // Stop the animation by clearing the interval
    clearInterval(animationInterval);
}

// Calculate the interval based on turbo state
function calculateInterval() {
    const baseInterval = 250; // Default interval
    const turboInterval = 50; // Interval when turbo is enabled
    return $("#turboCheckbox").prop("checked") ? turboInterval : baseInterval;
}

//Changes Animation
function changeAnimation() {
    const selectedAnimation = $("#animationSelect").val();
    $("#animationText").val(ANIMATIONS[selectedAnimation]);
}

//Changes Font Size
function changeFontSize() {
    const selectedSize = $("#fontSizeSelect").val();
    $("#animationText").css("font-size", selectedSize);
}

// Event listener for the font size select dropdown
$("#fontSizeSelect").on("change", changeFontSize);

//Function for Turbo Button
function toggleTurbo() {
    const isChecked = $("#turboCheckbox").prop("checked");
    const delay = isChecked ? 50 : 250;
    // Update animation speed immediately
    clearInterval(animationInterval);
    animationInterval = setInterval(function () {
    }, delay);
}
// Event listener for the turbo checkbox
$("#turboCheckbox").on("change", toggleTurbo);


function enableButton(buttonId) {
    $(buttonId).prop("disabled", false);
}

function disableButton(buttonId) {
    $(buttonId).prop("disabled", true);
}

function enableSelect(selectId) {
    $(selectId).prop("disabled", false);
}

function disableSelect(selectId) {
    $(selectId).prop("disabled", true);
}
