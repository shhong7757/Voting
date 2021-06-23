import dayjs from 'dayjs';

export function getVoteStatus(vote?: Vote): VoteStatus {
  if (vote) {
    if (!vote.activate || dayjs(vote.deadline).isBefore(dayjs())) {
      return 'DONE';
    }
    return 'INPROGRESS';
  }

  return 'NONE';
}
