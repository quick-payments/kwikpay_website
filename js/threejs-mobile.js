// 3D Mobile Screen with Three.js
class ThreeJSMobile {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.phone = null;
    this.animationId = null;
    this.isAutoRotating = false;
    this.isWireframe = false;
    
    this.init();
    this.createPhone();
    this.createLights();
    this.setupControls();
    this.animate();
    this.setupEventListeners();
  }

  init() {
    const container = document.getElementById('threejs-canvas');
    
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf8fafc);
    
    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 5);
    
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    
    container.appendChild(this.renderer.domElement);
    
    // Handle resize
    window.addEventListener('resize', () => this.onWindowResize());
  }

  createPhone() {
    // Phone body
    const phoneGeometry = new THREE.BoxGeometry(2, 4, 0.2);
    const phoneMaterial = new THREE.MeshPhongMaterial({
      color: 0x1a1a1a,
      shininess: 100,
      specular: 0x444444
    });
    
    this.phone = new THREE.Mesh(phoneGeometry, phoneMaterial);
    this.phone.castShadow = true;
    this.phone.receiveShadow = true;
    
    // Screen
    const screenGeometry = new THREE.PlaneGeometry(1.8, 3.6);
    const screenMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
      emissive: 0x111111,
      shininess: 200
    });
    
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.z = 0.11;
    this.phone.add(screen);
    
    // Screen content (app interface)
    this.createScreenContent(screen);
    
    // Phone frame details
    this.createPhoneDetails();
    
    this.scene.add(this.phone);
  }

  createScreenContent(screen) {
    // App header background
    const headerGeometry = new THREE.PlaneGeometry(1.8, 0.6);
    const headerMaterial = new THREE.MeshBasicMaterial({
      color: 0x0980FF
    });
    
    const header = new THREE.Mesh(headerGeometry, headerMaterial);
    header.position.set(0, 1.5, 0.01);
    screen.add(header);
    
    // Status bar
    const statusBarGeometry = new THREE.PlaneGeometry(1.6, 0.2);
    const statusBarMaterial = new THREE.MeshBasicMaterial({
      color: 0x0980FF
    });
    
    const statusBar = new THREE.Mesh(statusBarGeometry, statusBarMaterial);
    statusBar.position.set(0, 1.7, 0.02);
    screen.add(statusBar);
    
    // Balance card
    const cardGeometry = new THREE.PlaneGeometry(1.6, 1.2);
    const cardMaterial = new THREE.MeshBasicMaterial({
      color: 0x0980FF
    });
    
    const balanceCard = new THREE.Mesh(cardGeometry, cardMaterial);
    balanceCard.position.set(0, 0.8, 0.01);
    screen.add(balanceCard);
    
    // Quick actions grid
    this.createQuickActions(screen);
  }

  createQuickActions(screen) {
    const actionColors = [0x0980FF, 0x28a745, 0xffc107, 0xdc3545];
    
    for (let i = 0; i < 4; i++) {
      const actionGeometry = new THREE.PlaneGeometry(0.7, 0.7);
      const actionMaterial = new THREE.MeshBasicMaterial({
        color: actionColors[i]
      });
      
      const action = new THREE.Mesh(actionGeometry, actionMaterial);
      const row = Math.floor(i / 2);
      const col = i % 2;
      
      action.position.set(
        (col - 0.5) * 0.8,
        -0.2 - row * 0.8,
        0.01
      );
      
      screen.add(action);
    }
  }

  createPhoneDetails() {
    // Home button
    const buttonGeometry = new THREE.CircleGeometry(0.15, 32);
    const buttonMaterial = new THREE.MeshPhongMaterial({
      color: 0x333333,
      shininess: 50
    });
    
    const homeButton = new THREE.Mesh(buttonGeometry, buttonMaterial);
    homeButton.position.set(0, -1.8, 0.11);
    this.phone.add(homeButton);
    
    // Camera lens
    const lensGeometry = new THREE.CircleGeometry(0.08, 32);
    const lensMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
      shininess: 200
    });
    
    const cameraLens = new THREE.Mesh(lensGeometry, lensMaterial);
    cameraLens.position.set(0.6, 1.6, 0.11);
    this.phone.add(cameraLens);
    
    // Volume buttons
    const volumeGeometry = new THREE.BoxGeometry(0.1, 0.3, 0.05);
    const volumeMaterial = new THREE.MeshPhongMaterial({
      color: 0x333333
    });
    
    const volumeUp = new THREE.Mesh(volumeGeometry, volumeMaterial);
    volumeUp.position.set(-1.05, 0.8, 0);
    this.phone.add(volumeUp);
    
    const volumeDown = new THREE.Mesh(volumeGeometry, volumeMaterial);
    volumeDown.position.set(-1.05, 0.4, 0);
    this.phone.add(volumeDown);
  }

  createLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);
    
    // Directional light (main light)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    this.scene.add(directionalLight);
    
    // Point light for highlights
    const pointLight = new THREE.PointLight(0x0980FF, 0.5, 10);
    pointLight.position.set(-3, 3, 3);
    this.scene.add(pointLight);
    
    // Rim light
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
    rimLight.position.set(-5, 0, 5);
    this.scene.add(rimLight);
  }

  setupControls() {
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enableZoom = true;
    this.controls.enablePan = false;
    this.controls.autoRotate = false;
    this.controls.autoRotateSpeed = 2.0;
    this.controls.maxDistance = 10;
    this.controls.minDistance = 2;
  }

  setupEventListeners() {
    // Auto rotate button
    const rotateBtn = document.getElementById('rotateBtn');
    if (rotateBtn) {
      rotateBtn.addEventListener('click', () => {
        this.isAutoRotating = !this.isAutoRotating;
        this.controls.autoRotate = this.isAutoRotating;
        rotateBtn.classList.toggle('active', this.isAutoRotating);
      });
    }
    
    // Reset view button
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.camera.position.set(0, 0, 5);
        this.controls.reset();
      });
    }
    
    // Wireframe button
    const wireframeBtn = document.getElementById('wireframeBtn');
    if (wireframeBtn) {
      wireframeBtn.addEventListener('click', () => {
        this.isWireframe = !this.isWireframe;
        this.phone.traverse((child) => {
          if (child.isMesh && child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => mat.wireframe = this.isWireframe);
            } else {
              child.material.wireframe = this.isWireframe;
            }
          }
        });
        wireframeBtn.classList.toggle('active', this.isWireframe);
      });
    }
  }

  onWindowResize() {
    const container = document.getElementById('threejs-canvas');
    this.camera.aspect = container.clientWidth / container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    
    // Update controls
    this.controls.update();
    
    // Add subtle floating animation
    if (this.phone) {
      this.phone.position.y = Math.sin(Date.now() * 0.001) * 0.1;
      this.phone.rotation.z = Math.sin(Date.now() * 0.0005) * 0.05;
    }
    
    // Render
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    if (this.renderer) {
      this.renderer.dispose();
    }
    
    if (this.controls) {
      this.controls.dispose();
    }
  }
}

// Initialize 3D Mobile when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check if Three.js is available
  if (typeof THREE !== 'undefined') {
    // Check if the 3D mobile section exists
    const threejsSection = document.getElementById('3d-mobile-showcase');
    if (threejsSection) {
      // Initialize after a short delay to ensure DOM is ready
      setTimeout(() => {
        try {
          window.threeJSMobile = new ThreeJSMobile();
        } catch (error) {
          console.error('Error initializing 3D Mobile:', error);
          // Show fallback content
          const canvas = document.getElementById('threejs-canvas');
          if (canvas) {
            canvas.innerHTML = `
              <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #64748b; font-size: 1.1rem;">
                <div style="text-align: center;">
                  <i class="bi bi-phone" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
                  <p>3D Mobile Experience</p>
                  <p style="font-size: 0.9rem; opacity: 0.7;">Interactive 3D phone model with animations</p>
                </div>
              </div>
            `;
          }
        }
      }, 100);
    }
  }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (window.threeJSMobile) {
    window.threeJSMobile.destroy();
  }
});
