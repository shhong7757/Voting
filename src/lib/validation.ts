import dayjs from 'dayjs';
import {Form} from '../reducers';

type FormProperty = keyof Form;

export class FormValidationError extends Error {
  properties: Array<FormProperty>;

  constructor(message: string, properties: Array<FormProperty>) {
    super(message);
    this.name = 'FormValidationError';
    this.properties = properties;
  }
}

export class AuthValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthValidationError';
  }
}

export function validateFormData(data: Form) {
  const properties: Array<FormProperty> = [];

  if (data.title === '') {
    properties.push('title');
  }

  const now = dayjs();
  if (dayjs(data.deadline).isBefore(now)) {
    properties.push('deadline');
  }

  if (dayjs(data.startDate).isBefore(now)) {
    properties.push('startDate');
  }

  //
  const newSet = new Set();
  data.list.forEach(v => newSet.add(v));
  if (
    newSet.size !== data.list.length ||
    data.list.filter(item => item === '').length > 0
  ) {
    properties.push('list');
  }

  if (properties.length > 0) {
    throw new FormValidationError('form has validation errors', properties);
  }
}

export function getFormValidationMessage(
  error: keyof Omit<Form, 'loading' | 'validationError'>,
) {
  switch (error) {
    case 'deadline':
      return '마감 시간은 시작 시간 이후로 설정이 필요합니다.';
    case 'list':
      return '항목 중복 또는 빈 항목이 있어서는 안됩니다.';
    case 'title':
      return '제목을 작성해주세요.';
    case 'startDate':
      return '시작 시간은 현재 시간 이후로 설정이 필요합니다.';
    default:
      return '';
  }
}
