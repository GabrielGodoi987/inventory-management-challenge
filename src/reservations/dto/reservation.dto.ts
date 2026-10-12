import * as yup from 'yup';

export const findReservationByIdDto = yup.object({
  id: yup
    .string()
    .uuid('Invalid reservation ID')
    .required('Reservation ID is required'),
});

export const createReservationdto = yup.object({
  productId: yup
    .string()
    .uuid('Invalid product ID')
    .required('Product ID is required'),
  quantity: yup
    .number()
    .required('Reservation quantity is required')
    .integer('Quantity must be an integer')
    .min(1, 'Quantity must be at least 1'),
});

export const updateReservationdto = yup.object({
  productId: yup.string().uuid('Invalid product ID'),
  quantity: yup
    .number()
    .integer('Quantity must be an integer')
    .min(1, 'Quantity must be at least 1'),
});

export type FindReservationByIdDto = yup.InferType<
  typeof findReservationByIdDto
>;
export type CreateReservationDto = yup.InferType<typeof createReservationdto>;
export type UpdateReservationDto = yup.InferType<typeof updateReservationdto>;

export class ReservationResponseDto {
  constructor(
    public readonly id: string,
    public readonly productId: string,
    public readonly quantity: number,
  ) {}
}
