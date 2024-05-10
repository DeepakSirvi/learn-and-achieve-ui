import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

   constructor(private resolver: ComponentFactoryResolver, private containerRef: ViewContainerRef) {
   }

  ngOnInit() {
    // this.loadNavbarDynamically();
    this.callFunction()

  }

  loadNavbarDynamically() {
    // Resolve the component factory for the NavbarComponent
    const factory = this.resolver.resolveComponentFactory(NavbarComponent);
  
    // Clear the contents of the container where the dynamic component will be inserted
    this.containerRef.clear();
  
    // Create an instance of the NavbarComponent using the resolved factory
    const componentRef = this.containerRef.createComponent(factory);
  
    // Trigger change detection for the dynamically created component
    componentRef.changeDetectorRef.detectChanges();
  
    // Get the native DOM element of the dynamically created component (the NavbarComponent)
    const navbarElement = componentRef.location.nativeElement;
  
    // Find the placeholder element in the container where the NavbarComponent will be inserted
    const placeholder = this.containerRef.element.nativeElement.querySelector('#navbarPlaceholder');
  
    // Replace the placeholder element with the NavbarComponent element in the DOM
    placeholder.parentNode.replaceChild(navbarElement, placeholder);
  }

  callFunction() {
    alert("Function called successfully!");
    const container = document.getElementById('container');
    if (container) {
      container.innerHTML = `
      <style>
      .dropdown-container {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f2f2f2;
          padding: 20px;
      }

      .dropdown {
          margin-right: 10px;
      }

      select {
          font-size: 16px;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          background-color: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
      }

      button {
          font-size: 16px;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          background-color: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          cursor: pointer;
      }
  </style>
          <div class="dropdown-container">
              <div class="dropdown">
                  <select>
                      <option value="">Location</option>
                      <option value="Indore">Indore</option>
                      <option value="Ujjain">Dewas</option>
                      <option value="">Ujjain</option>
                      <option value="Vidisha">Vidisha</option>
                      <option value="Bhopal">Bhopal</option>
                  </select>
              </div>
              <div class="dropdown">
                  <select>
                      <option value="">Department</option>
                      <option value="Java">Java</option>
                      <option value="Php">Php</option>
                      <option value="Python">Python</option>
                      <option value="Mern">Mern</option>
                  </select>
              </div>
              <div class="dropdown">
                  <select>
                      <option value="">Team</option>
                      <option value="Php">Php Developer</option>
                      <option value="Java">Java Developer</option>
                      <option value="Mern">Mern Developer</option>
                      <option value="Flutter">Flutter Developer</option>
                  </select>
              </div>
              <div class="dropdown">
                  <select>
                      <option value="">Contract</option>
                      <option value="Contract1">Contract1</option>
                      <option value="Contract2">Contract2</option>
                      <option value="Contract3">Contract3</option>
                      <option value="Contract4">Contract4</option>
                      <option value="Contract5">Contract5</option>
                  </select>
              </div>
              <button>&#8594;</button>
          </div>
     
      `;
    } else {
      console.error("Element with id 'container' not found.");
    }
  }
}
