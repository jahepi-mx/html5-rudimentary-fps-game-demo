class Tree {
    constructor(size, position) {
        this.translate = position;
        this.size = size;
        this.cubes = [
            new Cube(this.size, new Vector(0, 0, 0), 177, 156, 134),
            new Cube(this.size, new Vector(0, this.size * 2, 0), 177, 156, 134),

            new Cube(this.size, new Vector(0, this.size * 4, -this.size * 2), 0, 160, 0),
            new Cube(this.size, new Vector(0, this.size * 4, this.size * 2), 0, 160, 0),
            new Cube(this.size, new Vector(-this.size * 2, this.size * 4, 0), 0, 160, 0),
            new Cube(this.size, new Vector(this.size * 2, this.size * 4, 0), 0, 160, 0),
            
            new Cube(this.size, new Vector(0, this.size * 6, -this.size * 2), 0, 160, 0),
            new Cube(this.size, new Vector(0, this.size * 6, this.size * 2), 0, 160, 0),
            new Cube(this.size, new Vector(-this.size * 2, this.size * 6, 0), 0, 160, 0),
            new Cube(this.size, new Vector(this.size * 2, this.size * 6, 0), 0, 160, 0),

            new Cube(this.size, new Vector(this.size * 2, this.size * 6, this.size * 2), 0, 160, 0),
            new Cube(this.size, new Vector(this.size * 2, this.size * 6, -this.size * 2), 0, 160, 0),
            new Cube(this.size, new Vector(-this.size * 2, this.size * 6, this.size * 2), 0, 160, 0),
            new Cube(this.size, new Vector(-this.size * 2, this.size * 6, -this.size * 2), 0, 160, 0),

            new Cube(this.size, new Vector(0, this.size * 8, -this.size * 2), 0, 160, 0),
            new Cube(this.size, new Vector(0, this.size * 8, this.size * 2), 0, 160, 0),
            new Cube(this.size, new Vector(-this.size * 2, this.size * 8, 0), 0, 160, 0),
            new Cube(this.size, new Vector(this.size * 2, this.size * 8, 0), 0, 160, 0),
        ];
        for (let cube of this.cubes) {
            cube.position.addThis(this.translate);
        }
    }
    update(dt) {
        for (let cube of this.cubes) {
            cube.update(dt);
        }
    }
}