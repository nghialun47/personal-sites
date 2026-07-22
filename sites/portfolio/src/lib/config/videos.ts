export interface VideoItem {
	id: string;
	title: string;
	embedUrl: string;
	views: string;
	role: string;
	desc: string;
}

export interface ShortItem {
	src: string;
	title: string;
	views: string;
}

export const videoConfig = {
	longform: [
		{
			id: '9GbA2tv93mg',
			title: 'The Legal Drug Destroying Your Life!',
			embedUrl: 'https://www.youtube.com/embed/9GbA2tv93mg',
			views: '550K+ Views',
			role: 'Multicam Editing · B-Roll',
			desc: 'Cut between A/B cams to keep the delivery dynamic, and layered in b-roll to give each point visual weight — refining the edit pass by pass during footage review.'
		},
		{
			id: 'h_e7gdMyLPw',
			title: 'Rewire Your Brain For Success In 276 Seconds',
			embedUrl: 'https://www.youtube.com/embed/h_e7gdMyLPw',
			views: '200K+ Views',
			role: 'A/B Cam Cuts · B-Roll Selection',
			desc: 'Switched angles to match the energy of the delivery and placed supporting footage where the script needed reinforcement, keeping the pace tight throughout.'
		},
		{
			id: 'B8BJyaoyAFE',
			title: "Discipline's Lie That's Making You Miserable",
			embedUrl: 'https://www.youtube.com/embed/B8BJyaoyAFE',
			views: '260K+ Views',
			role: 'Multicam · B-Roll · Footage Review',
			desc: 'Handled the A/B cam switching and wove b-roll into the narrative where it needed visual support, tightening moments I caught while reviewing the footage.'
		}
	] as VideoItem[],
	shortform: [
		{
			src: 'https://www.instagram.com/p/DYsXv7zP0kP/embed',
			title: 'Short-Form Edit',
			views: '800K+ Views'
		},
		{
			src: 'https://www.instagram.com/reel/DYKTZHlh3t5/embed',
			title: 'Short-Form Edit',
			views: '360K+ Views'
		},
		{
			src: 'https://www.instagram.com/reel/DYHy4tchT7X/embed',
			title: 'Short-Form Edit',
			views: '375K+ Views'
		}
	] as ShortItem[]
};
