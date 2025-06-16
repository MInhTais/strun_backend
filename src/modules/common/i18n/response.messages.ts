type ResponseMessages = {
  [key: string]: {
    user: {
      created: string;
      updated: string;
      deleted: string;
      found: string;
      foundAll: string;
    };
    validation: {
      failed: string;
    };
  };
};

export const responseMessages: ResponseMessages = {
  en: {
    user: {
      created: 'User created successfully',
      updated: 'User updated successfully',
      deleted: 'User deleted successfully',
      found: 'User found successfully',
      foundAll: 'Users retrieved successfully',
    },
    validation: {
      failed: 'Validation failed',
    },
  },
  vi: {
    user: {
      created: 'Tạo người dùng thành công',
      updated: 'Cập nhật người dùng thành công',
      deleted: 'Xóa người dùng thành công',
      found: 'Tìm thấy người dùng',
      foundAll: 'Lấy danh sách người dùng thành công',
    },
    validation: {
      failed: 'Xác thực thất bại',
    },
  },
};
