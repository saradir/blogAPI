import { prisma } from '../lib/prisma';


export async function index(req, res){
    return;
}
export async function show(req, res){
    return;
}

export async function create(req, res){
    return res.status(200).json({success: "wow"});
}
export async function edit(req, res){
    return;
}
export async function remove(req, res){
    return;
}
