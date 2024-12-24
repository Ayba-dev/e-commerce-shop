export function getCookie(name: string): string | null {
    const cookieString = document.cookie; // Получить все cookies в виде строки
    const cookies = cookieString.split(';'); // Разбить строку на массив "ключ=значение"
    for (const cookie of cookies) {
        const [key, value] = cookie.trim().split('='); // Разделить ключ и значение
        if (key === name) {
            return decodeURIComponent(value); // Раскодировать значение и вернуть
        }
    }
    return null; // Вернуть null, если cookie с таким именем не найден
}