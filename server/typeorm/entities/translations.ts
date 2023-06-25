import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';

@Entity('translations')
export class TranslationsEntity extends BaseEntity {
    @PrimaryColumn({ primary: true, type: 'varchar' })
    token: string

    @Column({ type: 'varchar' })
    translation: string
}

export type TranslationRow = { token: string, translation: string }