const usernameInput = document.getElementById('username');
const button = document.getElementById('join_leave');
const leav = document.getElementById('leave');
const container = document.getElementById('container');
const count = document.getElementById('count');
let connected = false;
let room;
import axios from "axios";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
export default function login(requestOptions) {
	return axios.post('/api/user/login', requestOptions)
}
const addLocalVideo = async () => {
	const track = await Twilio.Video.createLocalVideoTrack();
	const video = document.getElementById('local').firstElementChild;
	video.appendChild(track.attach());
};

const connectButtonHandler = async (event) => {
	event.preventDefault();
	if (!connected) {
		const username = usernameInput.value;
		if (!username) {
			alert('Enter your name before connecting');
			return;
		}
		button.disabled = true;
		button.innerHTML = 'Connecting...';
		try {
			await connect(username);
			button.innerHTML = 'Leave call';
			button.disabled = false;
		}
		catch {
			alert('La connexion a échoué');
			button.innerHTML = 'Join call';
			button.disabled = false;
		}
	}
	else {
		disconnect();
		button.innerHTML = 'Join call';
		connected = false;
	}
};

const connect = async (username) => {
	const response = await fetch('/access_token', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({'username': username}),
	});
	const data = await response.json();
	room = await Twilio.Video.connect(data.token);
	room.participants.forEach(participantConnected);
	room.on('participantConnected', participantConnected);
	room.on('participantDisconnected', participantDisconnected);
	connected = true;
	updateParticipantCount();
};

const updateParticipantCount = () => {
	if (!connected) {
		count.innerHTML = 'Disconnected.';
	}
	else {
		count.innerHTML = (room.participants.size + 1) + ' participants online.';
	}
};

const participantConnected = (participant) => {
	const participantDiv = document.createElement('div');
	participantDiv.setAttribute('id', participant.sid);
	participantDiv.setAttribute('class', 'participant');
	
	const tracksDiv = document.createElement('div');
	participantDiv.appendChild(tracksDiv);
	
	const labelDiv = document.createElement('div');
	labelDiv.innerHTML = participant.identity;
	participantDiv.appendChild(labelDiv);
	
	container.appendChild(participantDiv);
	
	participant.tracks.forEach(publication => {
		if (publication.isSubscribed) {
			trackSubscribed(tracksDiv, publication.track);
		}
	});
	participant.on('trackSubscribed', track => trackSubscribed(tracksDiv, track));
	participant.on('trackUnsubscribed', trackUnsubscribed);
	updateParticipantCount();
};

const participantDisconnected = (participant) => {
	document.getElementById(participant.sid).remove();
	updateParticipantCount();
};

const trackSubscribed = (div, track) => {
	div.appendChild(track.attach());
};

const trackUnsubscribed = (track) => {
	track.detach().forEach(element => element.remove());
};

const disconnect = () => {
	room.disconnect();
	while (container.lastChild.id != 'local') {
		container.removeChild(container.lastChild);
	}
	button.innerHTML = 'Join call';
	connected = false;
	updateParticipantCount();
};
const leaveButtonHandler = async (event) => {
	event.preventDefault();
	if (connected) {
		const username = usernameInput.value;
		if (!username) {
			alert('Enter your name before connecting');
			return;
		}
		button.disabled = true;
		button.innerHTML = 'Connecting...';
		try {
			await disconnect(username);
			button.innerHTML = 'Leave call';
			button.disabled = false;
		}
		catch {
			alert('La connexion a échoué');
			button.innerHTML = 'Leave';
			button.disabled = false;
		}
	}
	else {
		disconnect();
		button.innerHTML = 'Join call';
		connected = false;
	}
};
addLocalVideo();
button.addEventListener('click', connectButtonHandler);
leav.addEventListener('click', leaveButtonHandler);


// Your Account Sid and Auth Token from twilio.com/console
// and set the environment variables. See http://twil.io/secure

