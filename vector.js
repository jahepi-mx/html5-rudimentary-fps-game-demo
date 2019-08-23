class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    addThis(vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
        return this;
    }

    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }

    subThis(vector) {
        this.x = vector.x - this.x;
        this.y = vector.y - this.y;
        this.z = vector.z - this.z;
        return this;
    }

    sub(vector) {
        return new Vector(vector.x - this.x, vector.y - this.y, vector.z - this.z);
    }

    mulThis(vector) {
        this.x *= vector.x;
        this.y *= vector.y;
        this.z *= vector.z;
        return this;
    }

    mulThisByScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }

    mulByScalar(scalar) {
        return new Vector(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    mul(vector) {
        return new Vector(this.x * vector.x, this.y * vector.y, this.z * vector.z);
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    normalizeThis() {
        var length = 1 / this.length();
        this.x *= length;
        this.y *= length;
        this.z *= length;
        return this;
    }

    normalize() {
        var length = 1 / this.length();
        return new Vector(this.x * length, this.y * length, this.z * length);
    }

    dot(vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }

    cross(vector) {
        var newVector = new Vector(0, 0, 0);
        newVector.x = this.y * vector.z - this.z * vector.y;
        newVector.y = this.z * vector.x - this.x * vector.z;
        newVector.z = this.x * vector.y - this.y * vector.x;
        return newVector;
    }

    clone() {
        return new Vector(this.x, this.y, this.z);
    }
}