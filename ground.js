class Ground extends Polygon {
    constructor(r, g, b) {
        super(r, g, b);
    }
    setVertexs(camera) {
        var upGround = new Vector(0, 1, 0);
        var zGround = camera.direction.clone();
        var xGround = upGround.cross(zGround);
        var yGround = zGround.cross(xGround);
        xGround.y = 0;
        zGround.y = 0;
        xGround.normalizeThis();
        zGround.normalizeThis();
        this.vertex3 = xGround.mulByScalar(20).add(yGround.mulByScalar(-4)).add(zGround);
        this.vertex2 = xGround.mulByScalar(-20).add(yGround.mulByScalar(-4)).add(zGround);
        this.vertex1 = xGround.mulByScalar(-20).add(zGround.mulByScalar(5));
        this.vertex4 = xGround.mulByScalar(20).add(zGround.mulByScalar(5));
        this.translate.x = camera.position.x;
        this.translate.y = camera.position.y;
        this.translate.z = camera.position.z;
    }
    render(context) {
        var v1 = this.transformations.transform3dto2d(this.wVertex1, width, height);
        var v2 = this.transformations.transform3dto2d(this.wVertex2, width, height);
        var v3 = this.transformations.transform3dto2d(this.wVertex3, width, height);
        var v4 = this.transformations.transform3dto2d(this.wVertex4, width, height);
        var grd = context.createLinearGradient(0, 0, 0, height);
        grd.addColorStop(1, "rgb(" + this.r + ", " + this.g + ", " + this.b + ")");
        grd.addColorStop(0, "black");
        // Fill with gradient
        context.fillStyle = grd;
        // Center Canvas
        v1.y *= -1;
        v2.y *= -1;
        v3.y *= -1;
        v4.y *= -1;
        var centerVector = new Vector(halfWidth, halfHeight, 0);
        v1.addThis(centerVector);
        v2.addThis(centerVector);
        v3.addThis(centerVector);
        v4.addThis(centerVector);
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
    }
}

