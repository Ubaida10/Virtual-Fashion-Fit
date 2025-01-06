import { Component, ViewChild, ElementRef } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-try-on',
  templateUrl: './try-on.component.html',
  styleUrls: ['./try-on.component.css'],
  imports: [
    NgIf,
    NgForOf,
    FormsModule
  ]
})
export class TryOnComponent {
  @ViewChild('personInput', { static: false }) personInputRef!: ElementRef; // Reference for person file input
  @ViewChild('garmentInput', { static: false }) garmentInputRef!: ElementRef; // Reference for garment file input

  personExamples: string[] = [
    'assets/person_images/1.jpg',
    'assets/person_images/2.jpg',
    'assets/person_images/3.jpg',
    'assets/person_images/4.jpg',
    'assets/person_images/5.jpg',
  ];

  garmentExamples: string[] = [
    'assets/cloth_images/1.jpg',
    'assets/cloth_images/2.jpg',
    'assets/cloth_images/3.jpg',
    'assets/cloth_images/4.jpg',
    'assets/cloth_images/5.jpg',
  ];

  personImage: File | null = null; // Store the uploaded person image file
  garmentImage: File | null = null; // Store the uploaded garment image file
  personImageUrl: string | null = null; // Preview URL for person image
  garmentImageUrl: string | null = null; // Preview URL for garment image

  resultImage: string | null = null;

  seedValue: number = 0;
  randomSeed: boolean = false;
  response: string = '';
  /**
   * Handle file input dynamically for both person and garment images.
   * @param event File input change event.
   * @param type Specifies whether the file is for 'person' or 'garment'.
   */
  handleFileInput(event: Event, type: string): void {
    const input = event.target as HTMLInputElement; // Get the input element
    const file = input?.files?.[0]; // Get the selected file

    if (file) {
      // Validate file type (ensure only image files are accepted)
      if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file!');
        return;
      }

      const reader = new FileReader(); // Create a FileReader for preview

      reader.onload = () => {
        if (type === 'person') {
          this.personImage = file; // Save the file for person image
          this.personImageUrl = reader.result as string; // Generate preview URL
        } else if (type === 'garment') {
          this.garmentImage = file; // Save the file for garment image
          this.garmentImageUrl = reader.result as string; // Generate preview URL
        }
      };

      reader.readAsDataURL(file); // Read the file to generate preview
    }
  }

  /**
   * Trigger file input click programmatically.
   * @param type Specifies whether the input is for 'person' or 'garment'.
   */
  triggerFileInput(type: string): void {
    if (type === 'person') {
      this.personInputRef.nativeElement.click(); // Trigger click on person input
    } else if (type === 'garment') {
      this.garmentInputRef.nativeElement.click(); // Trigger click on garment input
    }
  }

  /**
   * Function to handle the Run button click. Validates uploaded images before processing.
   */
  runTryOn(): void {
    if (!this.personImage || !this.garmentImage) {
      alert('Please upload both the person and garment images before running!');
      return;
    }

    // Prepare files for upload or processing
    const formData = new FormData();
    formData.append('personImage', this.personImage); // Add person image to FormData
    formData.append('garmentImage', this.garmentImage); // Add garment image to FormData

    // Log FormData for debugging
    console.log('FormData prepared for upload:', formData);

    // Simulate backend call or processing logic
    alert('Run functionality triggered! Add your backend integration to handle the images.');
  }

  generateSeed(): void {
    if (this.randomSeed) {
      this.seedValue = Math.floor(Math.random() * 100);
    }
    this.response = `Generated seed value: ${this.seedValue}`;
  }
}
