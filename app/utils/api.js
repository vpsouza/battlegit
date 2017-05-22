import axios from 'axios';

const id = '90a76c508e7e2eef7466';
const sec = '5d9c29cb1fa6770330b35d9cbbeb1449e17a77cc';
const params = '?client_id='+id+'&client_secret='+sec;

const githubBaseUrl = 'https://api.github.com/users/';

const getProfile = userName => axios.get(githubBaseUrl + userName + params).then(res => Promise.resolve(res.data));
const getRepos = userName => axios.get(githubBaseUrl + userName + '/repos' + params + '&per_page=100');
const getStarCount = repos => repos.data.reduce((count,repo) => count + repo.stargazers_count, 0);
const calculateScore = (profile,repos) => (profile.followers * 3) + getStarCount(repos);
const getUserData = player => axios.all(
		[getProfile(player), getRepos(player)]).then(
			([profile,repos]) => ({
				profile: profile, 
				score: calculateScore(profile,repos)
			})
		);
const sortPlayers = players => players.sort((a,b) => b.score - a.score);

export default class Api {
	static battle(players){
		return axios.all(players.map(getUserData)).then(sortPlayers).catch(err => {
			console.warn(err);
			return null});
	}
	static fetchPopularRepos(language) {
		let encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' +
			language + '&sort=stars&order=desc&type=Repositories');

		return axios.get(encodedURI).then((response) => Promise.resolve(response.data.items));
	}
};