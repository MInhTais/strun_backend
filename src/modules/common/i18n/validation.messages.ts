type ValidationMessages = {
  [key: string]: {
    required: {
      email: string;
      password: string;
      fullName: string;
    };
    invalid: {
      email: string;
      password: string;
      fullName: string;
    };
    type: {
      email: string;
      password: string;
      fullName: string;
    };
  };
};

export const validationMessages: ValidationMessages = {
  en: {
    required: {
      email: 'Please enter your email',
      password: 'Please enter your password',
      fullName: 'Please enter your full name',
    },
    invalid: {
      email: 'Invalid email format',
      password: 'Password must be at least 6 characters',
      fullName: 'Full name must be at least 2 characters',
    },
    type: {
      email: 'Email must be a string',
      password: 'Password must be a string',
      fullName: 'Full name must be a string',
    },
  },
  vi: {
    required: {
      email: 'Vui lòng nhập email',
      password: 'Vui lòng nhập mật khẩu',
      fullName: 'Vui lòng nhập họ tên',
    },
    invalid: {
      email: 'Email không đúng định dạng',
      password: 'Mật khẩu phải có ít nhất 6 ký tự',
      fullName: 'Họ tên phải có ít nhất 2 ký tự',
    },
    type: {
      email: 'Email phải là chuỗi ký tự',
      password: 'Mật khẩu phải là chuỗi ký tự',
      fullName: 'Họ tên phải là chuỗi ký tự',
    },
  },
} as const;
