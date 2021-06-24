import dayjs from 'dayjs';
import {FormValidationError, validateFormData} from './validation';
import {defaultFormData} from '../../__mock__/';

describe('lib/validation.ts 테스트', () => {
  describe('validateFormData 함수 테스트', () => {
    it('title 값이 공백일 경우 FormValidationErorr를 throw한다.', () => {
      expect(() => {
        validateFormData({...defaultFormData, title: ''});
      }).toThrow(FormValidationError);
    });

    it('startDate가 현재 시간보다 이전이라면 FormValidationErorr를 throw한다.', () => {
      expect(() => {
        validateFormData({
          ...defaultFormData,
          startDate: dayjs().subtract(1, 'd').toDate(),
        });
      }).toThrow(FormValidationError);
    });

    it('deadline가 startDate보다 이전이라면 FormValidationErorr를 throw한다.', () => {
      expect(() => {
        validateFormData({...defaultFormData, title: ''});
      }).toThrow(FormValidationError);
    });

    it('항목에 공백이 있을경우 FormValidationError를 throw한다.', () => {
      expect(() => {
        validateFormData({...defaultFormData, list: ['빨강', '파랑', '']});
      }).toThrow(FormValidationError);
    });

    it('중복된 항목이 있다면 FormValidationError를 throw한다.', () => {
      expect(() => {
        validateFormData({...defaultFormData, list: ['빨강', '빨강', '파랑']});
      }).toThrow(FormValidationError);
    });
  });
});
