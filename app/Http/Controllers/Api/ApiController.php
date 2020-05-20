<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\CommonController;


class ApiController extends CommonController
{
    public function ini()
    {
        $data =
          [
              ['name'=>'Phalaenopsis',//蝴蝶兰
              'start'=>110,
              'end'=>91,
              'isGlutamine'=>true,
              'isAmicAcid'=>false,
              'isSalicylicAcid'=>true,
              'waterContent'=>0.85,],
             [
                  'name'=> 'Cactus',//仙人掌
                  'start'=> 80,
                  'end'=> 92,
                  'isGlutamine'=> false,
                  'isAmicAcid'=> false,
                  'isSalicylicAcid'=> true,
                  'waterContent'=> 0.76
              ],
              [
                  'name'=> 'Aloe',//芦荟
                  'start'=> 87,
                  'end'=> 96,
                  'isGlutamine'=> true,
                  'isAmicAcid'=> false,
                  'isSalicylicAcid'=> false,
                  'waterContent'=> 0.72
              ],
              [
                  'name'=> 'Bamboo',
                  'start'=> 85,
                  'end'=> 110,
                  'isGlutamine'=> false,
                  'isAmicAcid'=> false,
                  'isSalicylicAcid'=> false,
                  'waterContent'=> 0.80
              ],
              [
                  'name'=> 'MorningGlory',//喇叭花
                  'start'=> 56,
                  'end'=> 100,
                  'isGlutamine'=> false,
                  'isAmicAcid'=> true,
                  'isSalicylicAcid'=> false,
                  'waterContent'=> 0.86
              ],
              [
                  'name'=> 'Manjulan',//万朱兰
                  'start'=> 63,
                  'end'=> 74,
                  'isGlutamine'=> true,
                  'isAmicAcid'=> false,
                  'isSalicylicAcid'=> false,
                  'waterContent'=> 0.78
              ],
              [
                  'name'=> 'Lily',//百合
                  'start'=> 73,
                  'end'=> 83,
                  'isGlutamine'=> false,
                  'isAmicAcid'=> false,
                  'isSalicylicAcid'=> false,
                  'waterContent'=> 0.73
              ],
              [
                  'name'=> 'Sunflower',
                  'start'=> 103,
                  'end'=> 106,
                  'isGlutamine'=> false,
                  'isAmicAcid'=> true,
                  'isSalicylicAcid'=> false,
                  'waterContent'=> 0.77
              ],
              [
                  'name'=> 'Nepenthes',//猪笼草
                  'start'=> 77,
                  'end'=> 94,
                  'isGlutamine'=> true,
                  'isAmicAcid'=> false,
                  'isSalicylicAcid'=> true,
                  'waterContent'=> 0.89
              ],
              [
                  'name'=> 'Mimosa',//含羞草
                  'start'=> 89,
                  'end'=> 92,
                  'isGlutamine'=> false,
                  'isAmicAcid'=> false,
                  'isSalicylicAcid'=> true,
                  'waterContent'=> 0.73
              ],
              [
                  'name'=> 'chrysanthemum',//菊花
                  'start'=> 53,
                  'end'=> 73,
                  'isGlutamine'=> false,
                  'isAmicAcid'=> true,
                  'isSalicylicAcid'=> false,
                  'waterContent'=> 0.83
              ],
              [
                  'name'=> 'Phalaenopsis',//蝴蝶兰
                  'start'=> 110,
                  'end'=> 91,
                  'isGlutamine'=> true,
                  'isAmicAcid'=> false,
                  'isSalicylicAcid'=> true,
                  'waterContent'=> 0.85
              ],
      ];
        return $this->response($data);
    }
}
