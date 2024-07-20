import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../_services/document.service';
import { Document } from '../_models/document.model';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  documents: Document[] = [];

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documentService.getDocuments().subscribe((data: Document[]) => {
      this.documents = data;
    });
  }

  download(id: number) {
    this.documentService.downloadDocument(id).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `document_${id}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Download error:', error);
    });
  }

  sendEmail(document: Document) {
    if (!document.userEmail) {
      alert('Email is required');
      return;
    }

    this.documentService.sendEmail(document.idDocument, document.userEmail).subscribe(
      response => {
        console.log(response.message);
        alert(response.message);
      },
      error => {
        console.error('Error sending email:', error);
        alert('Failed to send email');
      }
    );
  }
  viewDocument(id: number): void {
    this.documentService.viewDocument(id).subscribe({
        next: (data) => {
            const blob = new Blob([data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        },
        error: (err) => console.error('Error viewing document:', err)
    });
}
deleteDocument(id: number): void {
  this.documentService.deleteDocument(id).subscribe({
      next: () => {
          this.documents = this.documents.filter(doc => doc.idDocument !== id);
          console.log('Document deleted successfully');
      },
      error: (err) => console.error('Error deleting document:', err)
  });
}

}
