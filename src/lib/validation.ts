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

export function validateFormData(data: Form) {
  const properties: Array<FormProperty> = [];

  if (data.title === '') {
    properties.push('title');
  }

  const now = dayjs();
  if (dayjs(data.deadline).isBefore(now)) {
    properties.push('deadline');
  }

  if (data.list.filter(item => item === '').length > 0) {
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
      return '마감 시간은 지금 시간 이후로 설정해주세요.';
    case 'list':
      return '항목을 모두 채워주세요.';
    case 'title':
      return '제목을 작성해주세요.';
    default:
      return '';
  }
}