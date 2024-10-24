import { NextRequest } from "next/server";

export async function POST(req : NextRequest) {
    const body = await req.json();
    let charList = "abcdefghijklmnopqrstuvwxyz";
    let passchars = "";
    if(body.includeUppercase) passchars += charList.toUpperCase();
    if(body.includeLowercase) passchars += charList;
    if(body.includeSymbols) passchars += "!@#$%^&*";
    if(body.includeNumbers) passchars += "1234567890";
    return Response.json({password : await getRandomPassword(body.length, passchars)})
}

async function getRandomPassword(length : number, passchars : string) {
    let res = "";
    if(length > 56) return "Password Length exceeded";
    for(let i=0;i<length;++i) {
        const randomIdx = Math.floor(Math.random() * passchars.length);
        res += passchars.charAt(randomIdx);
    } 
    return res;
}