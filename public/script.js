// Creating instance of Metered Javascript SDK
const meeting = new Metered.Meeting();
// Creating a Global variable to store the Meeting ID
let meetingId = "";

$("#joinExistingMeeting").on("click", async function (e) {
	if (e) e.preventDefault();
	
	meetingId = $("#meetingId").val();
	if (!meetingId) {
		return alert("Please enter meeting id");
	}
	
	// Sending request to validate meeting id
	try {
		const response = await axios.get(
			"/validate-meeting?meetingId=" + meetingId
		);
		if (response.data.success) {
			// Meeting id is valid, taking the user to the waiting area.
			$("#joinView").addClass("hidden");
			$("#waitingArea").removeClass("hidden");
			$("#displayMeetingId").text(meetingId);
			$("#meetingIdContainer").removeClass("hidden");
			initializeWaitingArea();
		} else {
			alert("meeting id is invalid");
		}
	} catch (ex) {
		alert("meeting Id is invalid");
	}
});

$("#createANewMeeting").on("click", async function (e) {
	if (e) e.preventDefault();
	
	// Sending request to create a new meeting room
	try {
		const response = await axios.post("/create-meeting-room");
		if (response.data.success) {
			$("#joinView").addClass("hidden");
			$("#waitingArea").removeClass("hidden");
			$("#displayMeetingId").text(response.data.roomName);
			$("#meetingIdContainer").removeClass("hidden");
			meetingId = response.data.roomName;
			initializeWaitingArea();
		}
	} catch (ex) {
		alert("Error occurred when creating a new meeting");
	}
});