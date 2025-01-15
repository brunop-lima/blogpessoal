import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tema } from "../entities/tema.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class TemaService{

    constructor(
        @InjectRepository(Tema)
        private temaRepositary: Repository<Tema>
    ){}

    async findAll(): Promise<Tema[]>{
        return this.temaRepositary.find();
    }

    async findById(id : number): Promise<Tema>{
        const tema = await this.temaRepositary.findOne({
            where: {
                id
            }
        })

        if(!tema)
            throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND)

        return tema;
    }

    async findByTitulo(nome: string): Promise<Tema[]>{
        return this.temaRepositary.find({
            where:{
                nome: ILike(`%${nome}%`)
            }
        }); 
    }

    async create(tema: Tema): Promise<Tema>{
        return await this.temaRepositary.save(tema);
    }

    async update(tema: Tema): Promise<Tema>{
        
        await this.findById(tema.id)
        return await this.temaRepositary.save(tema);
    }

    async delete(id: number): Promise<DeleteResult>{
        
        await this.findById(id)

        return await this.temaRepositary.delete(id)
    }
}