<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\CommonController;
use ParseCsv\Csv;
/*
 * 去掉了1718赛季还没有进入联盟的球员
 * 去掉了1819赛季上场次数小于10场的球员
 * */

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

    public function nba_mip_pts()
    {
        $mip1718 = new Csv('../storage/dataFile/nba_mip_pts/mip1718.csv');
        $mip1819 = new Csv('../storage/dataFile/nba_mip_pts/mip1819.csv');
        for($i = 0,$mip = [];$i<100;$i++){
            if($mip1819->data[$i]['GP']>10){
                if($mip1718->data[$i]['rank'] !== '#'){
                    $ele = [
                        'player'=>$mip1819->data[$i]['PLAYER'],
                        'pts18'=>+$mip1718->data[$i]['rank'],
                        'pts19'=>+$mip1819->data[$i]['rank']
                    ];
                    array_push($mip, $ele);
                }
            }
        }
        return $this->response($mip);
    }

    public function nba_mip_reb()
    {
        $mip1718 = new Csv('../storage/dataFile/nba_mip_reb/mip1718.csv');
        $mip1819 = new Csv('../storage/dataFile/nba_mip_reb/mip1819.csv');
        for($i = 0,$mip = [];$i<100;$i++) {
            if ($mip1819->data[$i]['rank'] !== '#') {
                if ($mip1718->data[$i]['rank'] !== '#') {
                    $ele = [
                        'player' => $mip1819->data[$i]['PLAYER'],
                        'reb18' => +$mip1718->data[$i]['rank'],
                        'reb19' => +$mip1819->data[$i]['rank']
                    ];
                    array_push($mip, $ele);
                }
            }
        }

        return $this->response($mip);
    }

    public function nba_mip_ast()
    {
        $mip1718 = new Csv('../storage/dataFile/nba_mip_ast/mip1718.csv');
        $mip1819 = new Csv('../storage/dataFile/nba_mip_ast/mip1819.csv');
        for($i = 0,$mip = [];$i<100;$i++){
            if($mip1819->data[$i]['rank'] !== '#') {
                if ($mip1718->data[$i]['rank'] !== '#') {
                    $ele = [
                        'player' => $mip1819->data[$i]['PLAYER'],
                        'ast18' => +$mip1718->data[$i]['rank'],
                        'ast19' => +$mip1819->data[$i]['rank']
                    ];
                    array_push($mip, $ele);
                }
            }
        }
        return $this->response($mip);
    }

    public function nba_mip_FG()
    {
        $mip1718 = new Csv('../storage/dataFile/nba_mip_FG/mip1718.csv');
        $mip1819 = new Csv('../storage/dataFile/nba_mip_FG/mip1819.csv');
        for($i = 0,$mip = [];$i<100;$i++){
            if($mip1718->data[$i]['rank'] !== '#'){
                $ele = [
                    'player'=>$mip1819->data[$i]['PLAYER'],
                    'FG18'=>+$mip1718->data[$i]['rank'],
                    'FG19'=>+$mip1819->data[$i]['rank']
                ];
                array_push($mip, $ele);
            }
        }
        return $this->response($mip);
    }

    public function nba_mip_min()
    {
        $mip1718 = new Csv('../storage/dataFile/nba_mip_min/mip1718.csv');
        $mip1819 = new Csv('../storage/dataFile/nba_mip_min/mip1819.csv');
        for($i = 0,$mip = [];$i<100;$i++){
            if($mip1718->data[$i]['rank'] !== '#'){
                $ele = [
                    'player'=>$mip1819->data[$i]['PLAYER'],
                    'PN18'=>+$mip1718->data[$i]['rank'],
                    'PN19'=>+$mip1819->data[$i]['rank']
                ];
                array_push($mip, $ele);
            }
        }
        return $this->response($mip);
    }
}
