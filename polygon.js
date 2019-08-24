class Polygon {
    constructor(r, g, b) {
        // Local Coords 
        this.vertex1 = new Vector(0, 0, 0);
        this.vertex2 = new Vector(0, 0, 0);
        this.vertex3 = new Vector(0, 0, 0);
        this.vertex4 = new Vector(0, 0, 0);
        // World Coords
        this.wVertex1 = new Vector(0, 0, 0);
        this.wVertex2 = new Vector(0, 0, 0);
        this.wVertex3 = new Vector(0, 0, 0);
        this.wVertex4 = new Vector(0, 0, 0);
        // Normal
        this.normal = new Vector(0, 0, 0);
        // Local normal from vertex1
        this.lNormal = new Vector(0, 0, 0);
        // World normal
        this.wNormal = new Vector(0, 0, 0);
        // Polygon translation vector
        this.translate = new Vector();
        // Color
        this.r = r;
        this.g = g;
        this.b = b;
        this.lightSource = new Vector(1, 0, 0);
        this.camera = Camera.getInstance();
        this.transformations = Transformations.getInstance();
        
        this.isYawRotation = false;
        this.yaw = 0;
        this.minZ = 3;
    }

    setNormal() {
        var v1 = this.vertex1.sub(this.vertex4);
        var v2 = this.vertex1.sub(this.vertex2);
        this.normal = v1.cross(v2).normalizeThis();
        this.lNormal = this.vertex1.add(this.normal);
    }

    render(context) {
        if (this.getAverageZ() <= this.minZ) {
            return;
        }
        var v1 = this.transformations.transform3dto2d(this.wVertex1, width, height);
        var v2 = this.transformations.transform3dto2d(this.wVertex2, width, height);
        var v3 = this.transformations.transform3dto2d(this.wVertex3, width, height);
        var v4 = this.transformations.transform3dto2d(this.wVertex4, width, height);
        var normal = this.transformations.transform3dto2d(this.wNormal, width, height);

        var diff = this.wVertex1.sub(this.wNormal);
        var dot = diff.dot(this.lightSource);
        var ratio = (dot + 1) * 0.5;
        ratio = 1 - ratio;
        context.fillStyle = "rgb(" + (this.r * ratio) + ", " + (this.g * ratio) + ", " + (this.b * ratio) + ")";
        // Center Canvas
        v1.y *= -1;
        v2.y *= -1;
        v3.y *= -1;
        v4.y *= -1;
        normal.y *= -1;
        var centerVector = new Vector(halfWidth, halfHeight, 0);
        v1.addThis(centerVector);
        v2.addThis(centerVector);
        v3.addThis(centerVector);
        v4.addThis(centerVector);
        normal.addThis(centerVector);
        // Render
        //context.strokeStyle = "#111";
        context.beginPath();
        context.moveTo(v1.x, v1.y);
        context.lineTo(v2.x, v2.y);
        context.lineTo(v3.x, v3.y);
        context.lineTo(v4.x, v4.y);
        context.lineTo(v1.x, v1.y);
        //context.stroke();
        context.fill();
        // Render normal
        /*
         context.strokeStyle = "#ff0000";
         context.beginPath();
         context.moveTo(v1.x, v1.y);
         context.lineTo(normal.x, normal.y);
         context.stroke();
         */
    }

    update(dt) {
        if (this.isYawRotation) {
            this.yaw += Math.PI * 0.5 * dt;
        }
        var v1 = this.transformations.yawTransform(this.yaw, this.vertex1);
        var v2 = this.transformations.yawTransform(this.yaw, this.vertex2);
        var v3 = this.transformations.yawTransform(this.yaw, this.vertex3);
        var v4 = this.transformations.yawTransform(this.yaw, this.vertex4);
        var normal = this.transformations.yawTransform(this.yaw, this.lNormal);

        var invCameraPosition = this.camera.position.mulByScalar(-1);
        this.wVertex1 = v1.add(this.translate).add(invCameraPosition);
        this.wVertex2 = v2.add(this.translate).add(invCameraPosition);
        this.wVertex3 = v3.add(this.translate).add(invCameraPosition);
        this.wVertex4 = v4.add(this.translate).add(invCameraPosition);
        this.wNormal = normal.add(this.translate).add(invCameraPosition);

        this.wVertex1 = this.transformations.getCameraSpace(this.wVertex1, this.camera);
        this.wVertex2 = this.transformations.getCameraSpace(this.wVertex2, this.camera);
        this.wVertex3 = this.transformations.getCameraSpace(this.wVertex3, this.camera);
        this.wVertex4 = this.transformations.getCameraSpace(this.wVertex4, this.camera);
        this.wNormal = this.transformations.getCameraSpace(this.wNormal, this.camera);
    }

    getAverageZ() {
        return (this.wVertex1.z + this.wVertex2.z + this.wVertex3.z + this.wVertex4.z) / 4;
    }
}