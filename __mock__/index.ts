import dayjs from 'dayjs';

export const defaultVote: Vote = {
  id: 'TQB7Mxi22uPV2sOx2xqb',
  account: {id: 1, name: 'A'},
  activate: true,
  created_at: dayjs().add(30, 'm').toDate(),
  deadline: dayjs().add(3, 'd').toDate(),
  list: ['빨강', '파랑', '노랑'],
  startDate: dayjs().add(30, 'm').toDate(),
  title: '당신이 좋아하는 색은',
};
