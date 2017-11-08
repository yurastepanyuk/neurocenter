import {EventEmitter, Injectable} from '@angular/core';
import {ContentEditI} from '../presa-aboutus/content-edit/content-edit-i';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable()
export class ContentService {

  constructor(public sanitizer: DomSanitizer) {}

  getUrlMediaContent(component: any, objImplemContent): string {
    if (component.isItImgGoogleDrive) {
      return 'https://drive.google.com/uc?export=download&id=' + objImplemContent.idcontent;
    } else if (component.isItVideoGoogleDrive) {
      return 'https://drive.google.com/file/d/' + objImplemContent.idcontent + '/preview';
    } else if (component.isItVideoYoutube) {
      return 'https://www.youtube.com/embed/' + objImplemContent.idcontent;
    } else if (component.isThereFolderGoogleDrive) {
      return 'https://drive.google.com/embeddedfolderview?id=' + objImplemContent.idcontent + '#list';
    } else if (component.isThereDownloadGoogleDrive) {
      return 'https://drive.google.com/uc?export=download&id=' + objImplemContent.idcontent;
    }

    return '';
  }

  initComponentOfContent(objOfCcomponent: any, objOfContent: any): void {
    if (objOfContent.typecontent === 'imageFromGoogleDrive'
      || objOfContent.typecontent === 'videoFromYouTube'
      || objOfContent.typecontent === 'videoFromGoogleDrive') {
      objOfCcomponent.isThereMedia = true;

      if (objOfContent.typecontent === 'imageFromGoogleDrive') {
        objOfCcomponent.isItImgGoogleDrive = true;
      } else if (objOfContent.typecontent === 'videoFromYouTube') {
        objOfCcomponent.isItVideoYoutube = true;
      } else if (objOfContent.typecontent === 'videoFromGoogleDrive') {
        objOfCcomponent.isItVideoGoogleDrive = true;
      }
    } else if (objOfContent.typecontent === 'fileFromGoogleDrive') {
      objOfCcomponent.isThereDownloadGoogleDrive = true;
    } else if (objOfContent.typecontent === 'folderFromGoogleDrive') {
      objOfCcomponent.isThereFolderGoogleDrive = true;
    } else if (objOfContent.typecontent === 'htmlContent') {
      objOfCcomponent.isItHtmlContent = true;
    }
  }

  parseMediaContentLink(link: string, typeContent: string) {
    console.log(typeContent);
    if (typeContent.indexOf('GoogleDrive') >= 0) {
      const arraySubstring = link.split('/');
      const lastString = arraySubstring[arraySubstring.length - 1];
      return lastString.slice(lastString.indexOf('id=') + 3);
    } else if (typeContent.indexOf('YouTube') >= 0 ) {
      const arraySubstring = link.split('/');
      const lastString = arraySubstring[arraySubstring.length - 1];
      return lastString.slice(lastString.indexOf('v=') + 2);
    }else {
      return link;
    }
  }

  sortedbyDateCreated(input: any[]): any[] {
    return input.sort((a: any, b: any) => Date.parse(b.dateCreated) - Date.parse(a.dateCreated));
  }

  getEmptyContent(): ContentEditI {
    return { headerTopic: null,
      context: null,
      typecontent: null,
      idcontent: null,
      dateCreated: null
    };
  }

  toContentEditIObject(item: any): ContentEditI {
    const content = {
      id: item && item._id || null,
      headerTopic: item && item.headerTopic || null,
      context: item && item.context || null,
      typecontent: item && item.typecontent || null,
      idcontent: item && item.idcontent || null,
      dateCreated: item && item.dateCreated || null
    };
    return content;
  }

}
