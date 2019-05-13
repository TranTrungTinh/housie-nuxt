export const messageError = (statusCode) => {
    if(statusCode === 401) return 'Sai email hoặc mật khẩu.';
    if(statusCode === 422) return 'Email đã có người đăng ký.';
    return 'Error message is not defind';
}