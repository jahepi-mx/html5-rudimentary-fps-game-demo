let cameraInstance = null;

class Camera {
    
    static getInstance() {
        if (cameraInstance === null) {
            cameraInstance = new Camera();
        }
        return cameraInstance;
    }
    
    constructor() {
        this.yaw = -110;
        this.pitch = 0;
        this.position = new Vector(19.8, 1, 57.8);
        this.direction = new Vector(Math.cos(this.yaw * toRadians), 0, Math.sin(this.yaw * toRadians));
    }
    
    update(yaw, pitch) {
        this.direction.x = Math.cos(pitch * toRadians) * Math.cos(yaw * toRadians);
        this.direction.y = Math.sin(pitch * toRadians);
        this.direction.z = Math.cos(pitch * toRadians) * Math.sin(yaw * toRadians);
    }
    
}


