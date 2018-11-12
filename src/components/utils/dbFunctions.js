import * as firebase from 'firebase';

const env = "public";

const getPlayers = (updateFunction) => {
	firebase.database().ref(env + '/')
		.on('value', (usersSnapshot) => {
			updateFunction(usersSnapshot.val());
		})
}

const addPlayer = (player) => {
	var ref = firebase.database().ref(env + '/');
	ref.push().set({
		Name: (player.firstName),
		LastName: (player.lastName),
		Nickname: (player.nickname),
		MMR: 2000,
		Games: 0,
		Victories: 0
	}, function (error) {
		if (error) {
			alert("Data could not be saved." + error);
		} else { }
	});
}

const updatePlayer = (player) => {
	firebase.database().ref(env + '/' + player.Id)
		.update({
			MMR: player.MMR,
			Games: player.Games,
			Victories: player.Victories
		}, function (error) {
			if (error) {
				alert("Data could not be updated." + error);
			} else { }
		});
}

const useThisToBackupDB = (player) => {
	firebase.database().ref(env + '/' + player.Id)
		.set(player, function (error) {
			if (error) {
				alert("Data could not be updated." + error);
			} else { }
		});
}

const saveToLogs = (players, winner) => {
	let match = { ...players, winningTeam: winner };
	let date = new Date().toDateString();
	let time = new Date().toTimeString()
	firebase.database().ref(env + 'logs/'+ date+'/'+ time)
		.set(match, function (error) {
			if (error) {
				alert("Data could not be saved." + error);
			} else { }
		});
}

export { getPlayers, addPlayer, updatePlayer, useThisToBackupDB, saveToLogs };