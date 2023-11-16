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
    disableButton("#turboCheckbox");
    // Set initial animation
    changeAnimation();
});

let animationInterval;
let currentFrame = 0;

function startAnimation() {
    enableButton("#stopButton");
    disableSelect("#animationSelect");
    disableButton("#turboCheckbox");

    const frames = $("#animationText").val().split("=====\n"); // Adjust separator if needed

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

function stopAnimation() {
    disableButton("#stopButton");
    enableSelect("#animationSelect");
    enableButton("#turboCheckbox");

    // Stop the animation by clearing the interval
    clearInterval(animationInterval);
}

function calculateInterval() {
    // Calculate the interval based on turbo state
    const baseInterval = 250; // Default interval
    const turboInterval = 50; // Interval when turbo is enabled

    return $("#turboCheckbox").prop("checked") ? turboInterval : baseInterval;
}

function changeAnimation() {
    const selectedAnimation = $("#animationSelect").val();
    $("#animationText").val(animations[selectedAnimation]);
}

function changeFontSize() {
    const selectedSize = $("#fontSizeSelect").val();
    $("#animationText").css("font-size", selectedSize);
}

function toggleTurbo() {
    const isChecked = $("#turboCheckbox").prop("checked");
    const delay = isChecked ? 50 : 250;

    // Implement logic to update animation speed

    clearInterval(animationInterval);
    animationInterval = setInterval(function () {
        // existing code
    }, delay);
}

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
