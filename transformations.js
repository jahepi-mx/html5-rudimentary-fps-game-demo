let transformationsInstance = null;

class Transformations {

    static getInstance() {
        if (transformationsInstance === null) {
            transformationsInstance = new Transformations();
        }
        return transformationsInstance;
    }
    
    constructor() {
        this.fov = 60;
        this.tan = Math.tan(this.fov * 0.5 * toRadians);
    }

    transform3dto2d(vector, width, height) {
        var factor = 1 / this.tan;
        var aspectRatio = height / width;
        var vector2d = new Vector(0, 0, 0);
        vector2d.x = vector.x / vector.z;
        vector2d.y = vector.y / vector.z;
        vector2d.x *= factor * aspectRatio;
        vector2d.y *= factor;
        vector2d.x = vector2d.x * width * 0.5;
        vector2d.y = vector2d.y * height * 0.5;
        return vector2d;
    }

    yawTransform(yaw, vector) {
        if (yaw === 0) {
            //Do not transform vector
            return vector;
        }
        var sin = Math.sin(yaw);
        var cos = Math.cos(yaw);
        var x = new Vector(cos, 0, sin);
        var y = new Vector(0, 1, 0);
        var z = new Vector(-sin, 0, cos);
        x.mulThisByScalar(vector.x);
        y.mulThisByScalar(vector.y);
        z.mulThisByScalar(vector.z);
        return x.add(y).add(z);
    }

    pitchTransform(pitch, vector) {
        var sin = Math.sin(pitch);
        var cos = Math.cos(pitch);
        var x = new Vector(1, 0, 0);
        var y = new Vector(0, cos, -sin);
        var z = new Vector(0, sin, cos);
        x.mulThisByScalar(vector.x);
        y.mulThisByScalar(vector.y);
        z.mulThisByScalar(vector.z);
        return x.add(y).add(z);
    }

    getCameraSpace(vector, camera) {
        var up = new Vector(0, 1, 0);
        var z = camera.direction;
        var x = up.cross(z).normalizeThis();
        var y = z.cross(x).normalizeThis();
        // Invert
        var ix = new Vector(x.x, y.x, z.x).mulByScalar(vector.x);
        var iy = new Vector(x.y, y.y, z.y).mulByScalar(vector.y);
        var iz = new Vector(x.z, y.z, z.z).mulByScalar(vector.z);
        return ix.add(iy).add(iz);
    }
}