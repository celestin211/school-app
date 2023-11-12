import React, { useState } from "react";
import axios from "axios";
import Video from "twilio-video";

const Chat = () => {

	const [roomName, setRoomName] = useState('');
	const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
	
	const connectToRoom = (token) => {
		const { connect, createLocalVideoTrack } = Video;
		
		let connectOption = { name: roomName };
		
		connect( token, connectOption).then(room => {
			
			console.log(`Successfully joined a Room: ${room}`);
			
			const videoChatWindow = document.getElementById('video-chat-window');
			const muteAudio = document.getElementById('muteAudio');
			const stopVideo = document.getElementById('stopVideo');
			const unmuteAudio = document.getElementById('unmuteAudio');
			const startVideo = document.getElementById('startVideo');
			
			startVideo.addEventListener('click', () => {
				room.localParticipant.videoTracks.forEach(track => {
					track.enable();
				});
			});
			
			
			unmuteAudio.addEventListener('click', () => {
				room.localParticipant.audioTracks.forEach(track => {
					track.enable();
				});
			});
			stopVideo.addEventListener('click', () => {
				room.localParticipant.videoTracks.forEach(track => {
					track.disable();
				});
			})
			muteAudio.addEventListener('click', () => {
				room.localParticipant.audioTracks.forEach(track => {
					track.disable();
				});
			});
			createLocalVideoTrack().then(track => {
				videoChatWindow.appendChild(track.attach());
			});
			
			createLocalVideoTrack().then(localVideoTrack => {
				return room.localParticipant.publishTrack(localVideoTrack);
			}).then(publication => {
				console.log('Successfully unmuted your video:', publication);
			});
			
			room.on('disconnected', room => {
				// Detach the local media elements
				room.localParticipant.tracks.forEach(publication => {
					const attachedElements = publication.track.detach();
					attachedElements.forEach(element => element.remove());
				});
			});

// To disconnect from a Room
			room.disconnect();
			room.localParticipant.audioTracks.forEach(publication => {
				publication.track.disable();
			});
			
			room.localParticipant.videoTracks.forEach(publication => {
				publication.track.disable();
			});
			
			room.localParticipant.audioTracks.forEach(publication => {
				publication.track.enable();
			});
			
			room.localParticipant.videoTracks.forEach(publication => {
				publication.track.enable();
			});
			
			room.localParticipant.videoTracks.forEach(publication => {
				publication.track.stop();
				publication.unpublish();
			});
			
			function handleTrackDisabled(track) {
				track.on('disabled', () => {
					/* Hide the associated <video> element and show an avatar image. */
				});
			}
			
			room.participants.forEach(participant => {
				participant.tracks.forEach(publication => {
					if (publication.isSubscribed) {
						handleTrackDisabled(publication.track);
					}
					publication.on('subscribed', handleTrackDisabled);
				});
			});
			room.participants.forEach(participant => {
				participant.tracks.forEach(publication => {
					publication.on('subscribed', () => {
						/* Hide the avatar image and show the associated <video> element. */
					});
				});
			});
			function handleTrackEnabled(track) {
				track.on('enabled', () => {
					/* Hide the avatar image and show the associated <video> element. */
				});
			}
			
			room.participants.forEach(participant => {
				participant.tracks.forEach(publication => {
					if (publication.isSubscribed) {
						handleTrackEnabled(publication.track);
					}
					publication.on('subscribed', handleTrackEnabled);
				});
			});
			room.on('participantConnected', participant => {
				console.log(`Participant "${participant.identity}" connected`);
				
				participant.tracks.forEach(publication => {
					if (publication.isSubscribed) {
						const track = publication.track;
						videoChatWindow.appendChild(track.attach());
					}
				});
				
				participant.on('trackSubscribed', track => {
					videoChatWindow.appendChild(track.attach());
					console.log(participant, length);
				});
			});
		}, error => {
			console.error(`Unable to connect to Room: ${error.message}`);
		});
	};

	
	const joinChat = event => {
		event.preventDefault();
		if (roomName) {
			axios.post('access_token', { roomName }, ).then((response) => {
				connectToRoom(response.data.token);
				setHasJoinedRoom(true);
				setRoomName('');
				
			}).catch((error) => {
				console.log(error);
			})
		} else {
			alert("You need to enter a room name")
		}
	};
	
	return(
		<div className="row justify-content-center">
			<div className="container-enter">
				<div className="card z-index-0 mb-7">
				{!hasJoinedRoom && (
					<div className="card-body">
					<form className="form-inline" onSubmit={joinChat}>
						<div className="mb-3">
						<input type="text" name={'roomName'} className={"form-control"} id="roomName"
							   placeholder="Enter a room name" value={roomName} onChange={event => setRoomName(event.target.value)}/>
						</div>
						<div className="text-center">
							<button type="submit" className="btn bg-gradient-dark btn-lg w-100 my-4 mb-2">Entrer</button></div>
					
					</form>
					</div>
				)}
				</div>
				<div id="video-chat-window" className="col-1-video">
					<button id="muteAudio">Mute</button>
					<button id="stopVideo">Stop</button>
					<button id="unmuteAudio">Unmute</button>
					<button id="startVideo">Play</button>
					<div className="contarols">
						<img src="https://i.postimg.cc/3NVtVtgf/chat.png"></img>
						<img src="https://i.postimg.cc/BQPYHG0r/disconnect.png"></img>
								<img src="https://i.postimg.cc/fyJH8G00/call.png" className="call-icon"></img>
									<img src="https://i.postimg.cc/bJFgSmFY/mic.png"></img>
										<img src="https://i.postimg.cc/Y2sDvCJN/cast.png"></img>
					</div>
				</div>
			</div>
		</div>
	)
};

export default Chat;