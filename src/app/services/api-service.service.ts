import { SettingsService } from './settings.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  store: any;
  localPhotos: any = localStorage.getItem('photos' || '')?.trim();

  constructor(private http: HttpClient, private settingsService: SettingsService) {
    this.store = this.localPhotos ? JSON.parse(this.localPhotos) : {}
  }

  buildUrl(imageType, imagesCount) {
    let url = new URL(environment.api_base);

    let params: any = {
      query: imageType,
      orientation: 'square',
      size: 'small',
      per_page: imagesCount,
      page: this.getRandomPage()
    }
    Object.keys(params).forEach(key => url.searchParams.set(key, params[key]))

    return url.toString();
  }


  getRandomPage() {
    return Math.round(Math.random() * (10 - 1) + 1);
  }

  async getImages() {
    try {
      const imagesType = this.settingsService.settings.images_type;
      const imagesCount = this.settingsService.settings.cards_count
      const url = this.buildUrl(imagesType, imagesCount);
      const result = this.store[url] ? this.store[url] : await firstValueFrom(
        this.http.get<{}>(url, {
          headers: {
            Authorization: environment.pexels_api_key
          }
        })
      )

      this.store[url] = result;
      // update chashe value
      localStorage.setItem('photos', JSON.stringify(this.store))

      const dataArray = this.store[url]['photos'].map((item: any) => {
        return { url: item.src.small }
      });
      const dublicateShuffleData = dataArray.concat(dataArray).sort(() => Math.random() - .5).map((item: any, index: string) => {
        return { id: `${index}${Date.now()}`, ...item, opened: false, disabled: false, matched: false }
      })

      return dublicateShuffleData;

    } catch (error) {
      console.log(error);

    }
  }
}
