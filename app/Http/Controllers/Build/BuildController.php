<?php

namespace App\Http\Controllers\Build;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\User;

class BuildController extends Controller
{
    public function upload(Request $request)
    {
        return view('build.upload.build');
    }

    public function uploadHandle(Request $request)
    {
        $validFileExtension = ['json', 'csv', 'gif'];
        //check file validation
        if ($request->hasFile('dataFile') && $request->file('dataFile')->isValid()){
            //check file type
            if(in_array($request->file('dataFile')->getClientOriginalExtension(), $validFileExtension)){
                //check file size
                if($request->file('dataFile')->getSize() > 5*1024*1024){
                    return back()->withErrors(['File size is too large (exceed 5M)',
                    ]);
                }else{
                    //the handle of data if everything goes right
                    $path = md5(time() . rand(100000, 999999)).'.'.$request->file('dataFile')->getClientOriginalExtension();
                    $request->file('dataFile')->move('./uploads', $path);
                    //insert the data name into database
                    User::create(['data_name' => $path]);
                    //process the stage1 and stage 2 name
                    if($request->file('dataFile')->getClientOriginalExtension() == 'json'){
                        $dataOrigin = file_get_contents('./uploads/' . $path);
                        $data = json_decode($dataOrigin,true);//add true, then convert into array instead of object.
                        //get all keys
                        $keys = array_keys($data[0]);
//                        dd(compact('keys'));
                        return redirect('/build/form')->with('keys',$keys)->with('message',"Yh! Datafile uploaded successfully!  Next customize your need below.");
                    }
                    if ($request->file('dataFile')->getClientOriginalExtension() == 'csv'){
                        $row = 1;
                        $handle = fopen("./uploads/".$path, "r");
//                        while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
//                            $num = count($data);
//                            echo "<p> $num fields in line $row: <br /></p>\n";
//                            $row++;
//                            for ($c=0; $c < $num; $c++) {
//                                echo $data[$c] . "<br />\n";
//                            }
//                        }
                        $keys = fgetcsv($handle);
                        fclose($handle);
                        return view('build.form.form',[
                            'keys'=>$keys,
                            'message'=>"Yh! Datafile uploaded successfully!  Next customize your need below."
                        ]);
                    }

                }
            }else{
                $errorFormat = $request->file('dataFile')->getClientOriginalExtension();
                return back()->withErrors(['Datafile format "'.$errorFormat.'" is not supported. Please change into regular datafile format(.json or .csv)']);
            }
        }else{
            return back()->withErrors(['Data file upload failed:(']);
        }
    }

    public function form()
    {
        return view('build.form.form');
    }

    public function formHandle(Request $request)
    {
        $email = $request['email'];
        $data_name = User::where('email','unset_email')->first()->data_name;
        //map the email into the data name
        User::where('email','unset_email')->first()->update(['email'=>$email]);

        //get the customize need array
        $data_name = $request['data_name'];
        $stage1 = $request['stage1'];
        $stage2 = $request['stage2'];
        $incrementColor = $request['incrementColor'];
        $decrementColor = $request['decrementColor'];
        $mode = $request['mode'];
        $filterMode = $request['filterMode'];
        $number = $request['number'];
        $need = compact('data_name','stage1','stage2','incrementColor','decrementColor','mode','filterMode','number');
//        if ($this->checkVoid($need)){
        if(true){
            return redirect('/build/view')->with('need',$need);
        }else{
            foreach ($need as $key=>$value) {
                if ($value == null) {
                    $void = $key;
                    break;
                }
            }
            return back()->with('void', $void);
        }
    }

    public function view()
    {
        return view('build.view.view');
    }

    protected function checkVoid($arr)
    {
        foreach ($arr as $key=>$value){
            if ($value == null){
                return false;
                break;
            }
        }
        return true;
    }
}
