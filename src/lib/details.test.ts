import {getVoteStatus} from './detailt';
import {defaultVote} from '../../__mock__/';
import dayjs from 'dayjs';

describe('lib/details.ts 테스트', () => {
  describe('getVoteStatus 함수 테스트', () => {
    it('생성자가 투표를 비활성화 했을 때 투표의 상태는 DONE이다.', () => {
      expect(getVoteStatus({...defaultVote, activate: false})).toEqual('DONE');
    });

    it('투표의 마감시간이 현재 시간보다 이전일 경우 투표의 상태는 DONE이다.', () => {
      expect(
        getVoteStatus({
          ...defaultVote,
          deadline: dayjs().subtract(1, 'h').toDate(),
        }),
      ).toEqual('DONE');
    });

    it('투표의 activate값이 true이고 현재시간이 마감시간보다 이전일 경우 투표의 상태는 INPROGRESS이다.', () => {
      expect(
        getVoteStatus({
          ...defaultVote,
          activate: true,
          deadline: dayjs().add(1, 'h').toDate(),
        }),
      ).toEqual('INPROGRESS');
    });

    it('투표가 undefined일 경우 상태는 NONE이다.', () => {
      expect(getVoteStatus(undefined)).toEqual('NONE');
    });
  });
});
