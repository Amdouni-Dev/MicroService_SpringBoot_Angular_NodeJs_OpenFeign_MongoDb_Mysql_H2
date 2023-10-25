import { Pipe, PipeTransform } from '@angular/core';
import { Contrat } from 'app/models/Contrat';
import {Claim} from '../../../models/Claim';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(claims: Claim[], filterText: string){
    if (claims.length === 0 || filterText===''){
      return claims;
    }else {
     return claims.filter((c)=>{
        return c.subject.toLowerCase()===filterText.toLowerCase()
      })
    }

  }

}
