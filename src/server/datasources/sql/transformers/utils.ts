// Конвертировать тысячи футов в метры
export const getMetresFromThousandFoots = (heightFoots: number): number => {
    return heightFoots * 1000 * 0.3048;
};

// Высота: если относительно земли нулевая, возвращаем высоту в тысячах футов,
// преобразуя в метры
export const getAltitude = (heightGround: number, heightFoots: number): number => {
    return heightGround || getMetresFromThousandFoots(heightFoots);
};

// Вектор скорости по базису (X, Y) в курсовой угол в градусах
export const getCourseAngle = (velocityX: number, velocityY: number): number => {
    let result;
    if (velocityX >= 0) {
        if (velocityY >= 0) {
            result = Math.atan(velocityY / velocityX);
        } else {
            result = 2 * Math.PI - Math.atan(velocityY / velocityX);
        }
    } else {
        if (velocityY >= 0) {
            result = Math.PI - Math.atan(velocityY / velocityX);
        } else {
            result = Math.PI + Math.atan(velocityY / velocityX);
        }
    }

    return result * 180 / Math.PI;
}

export const convertMinSecToDec = (grads: number, minutes: number, seconds: number): number => {
    return grads + minutes / 60 + seconds / 3600;
}