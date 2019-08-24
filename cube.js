class Cube {
    constructor(size, position, r, g, b) {
        this.size = size;
        this.position = position;
        this.dir = new Vector(0, 0, 0);
        this.traveled = new Vector(0, 0, 0);
        this.dispose = false;
        this.frontPolygon = new Polygon(r, g, b);
        this.backPolygon = new Polygon(r, g, b);
        this.topPolygon = new Polygon(r, g, b);
        this.bottomPolygon = new Polygon(r, g, b);
        this.leftPolygon = new Polygon(r, g, b);
        this.rightPolygon = new Polygon(r, g, b);
        this.polygons = [this.frontPolygon, this.backPolygon, this.topPolygon, this.bottomPolygon, this.leftPolygon, this.rightPolygon];

        this.frontPolygon.vertex1 = new Vector(-1 * this.size, 1 * this.size, -1 * this.size);
        this.frontPolygon.vertex2 = new Vector(-1 * this.size, -1 * this.size, -1 * this.size);
        this.frontPolygon.vertex3 = new Vector(1 * this.size, -1 * this.size, -1 * this.size);
        this.frontPolygon.vertex4 = new Vector(1 * this.size, 1 * this.size, -1 * this.size);
        this.frontPolygon.setNormal();
        this.backPolygon.vertex1 = new Vector(1 * this.size, 1 * this.size, 1 * this.size);
        this.backPolygon.vertex2 = new Vector(1 * this.size, -1 * this.size, 1 * this.size);
        this.backPolygon.vertex3 = new Vector(-1 * this.size, -1 * this.size, 1 * this.size);
        this.backPolygon.vertex4 = new Vector(-1 * this.size, 1 * this.size, 1 * this.size);
        this.backPolygon.setNormal();
        this.topPolygon.vertex1 = new Vector(-1 * this.size, 1 * this.size, 1 * this.size);
        this.topPolygon.vertex2 = new Vector(-1 * this.size, 1 * this.size, -1 * this.size);
        this.topPolygon.vertex3 = new Vector(1 * this.size, 1 * this.size, -1 * this.size);
        this.topPolygon.vertex4 = new Vector(1 * this.size, 1 * this.size, 1 * this.size);
        this.topPolygon.setNormal();
        this.bottomPolygon.vertex1 = new Vector(-1 * this.size, -1 * this.size, -1 * this.size);
        this.bottomPolygon.vertex2 = new Vector(-1 * this.size, -1 * this.size, 1 * this.size);
        this.bottomPolygon.vertex3 = new Vector(1 * this.size, -1 * this.size, 1 * this.size);
        this.bottomPolygon.vertex4 = new Vector(1 * this.size, -1 * this.size, -1 * this.size);
        this.bottomPolygon.setNormal();
        this.leftPolygon.vertex1 = new Vector(-1 * this.size, 1 * this.size, 1 * this.size);
        this.leftPolygon.vertex2 = new Vector(-1 * this.size, -1 * this.size, 1 * this.size);
        this.leftPolygon.vertex3 = new Vector(-1 * this.size, -1 * this.size, -1 * this.size);
        this.leftPolygon.vertex4 = new Vector(-1 * this.size, 1 * this.size, -1 * this.size);
        this.leftPolygon.setNormal();
        this.rightPolygon.vertex1 = new Vector(1 * this.size, 1 * this.size, -1 * this.size);
        this.rightPolygon.vertex2 = new Vector(1 * this.size, -1 * this.size, -1 * this.size);
        this.rightPolygon.vertex3 = new Vector(1 * this.size, -1 * this.size, 1 * this.size);
        this.rightPolygon.vertex4 = new Vector(1 * this.size, 1 * this.size, 1 * this.size);
        this.rightPolygon.setNormal();
    }

    setYawRotation(bool) {
        for (let polygon of this.polygons) {
            polygon.isYawRotation = bool;
        }
    }

    render(context) {
        for (let polygon of this.polygons) {
            polygon.render(context);
        }
    }

    update(dt) {
        var tmp = this.dir.mulByScalar(dt);
        this.traveled.addThis(tmp);
        this.position.addThis(tmp);
        for (let polygon of this.polygons) {
            polygon.translate.x = this.position.x;
            polygon.translate.y = this.position.y;
            polygon.translate.z = this.position.z;
            polygon.update(dt);
        }

        if (this.traveled.dot(this.traveled) >= 60 * 60) {
            this.dispose = true;
        }
    }
}