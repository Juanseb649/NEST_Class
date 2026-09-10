import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

export interface Pedido {
  id: string;
  cliente: string;
  producto: string;
  total: number;
  metodoPago: 'credito' | 'efectivo' | 'tc';
}

export interface CreatePedidoDto {
  id?: string;
  cliente: string;
  producto: string;
  total: number;
  metodoPago: 'credito' | 'efectivo' | 'tc';
}

@Controller('pedidos')
export class PedidosController {
  private pedidos: Pedido[] = [
    {
      id: '1',
      cliente: 'Maria',
      producto: 'Laptop Lenovo ThinkPad',
      total: 3500,
      metodoPago: 'credito',
    },
    {
      id: '2',
      cliente: 'Juan',
      producto: 'Mouse Inalámbrico Logitech',
      total: 80,
      metodoPago: 'efectivo',
    },
    {
      id: '3',
      cliente: 'Ana',
      producto: 'Monitor Dell 27"',
      total: 950,
      metodoPago: 'tc',
    },
    {
      id: '4',
      cliente: 'Carlos',
      producto: 'Teclado Mecánico Keychron',
      total: 220,
      metodoPago: 'credito',
    },
    {
      id: '5',
      cliente: 'Sofia',
      producto: 'Auriculares Sony WH-1000XM5',
      total: 1200,
      metodoPago: 'tc',
    },
    {
      id: '6',
      cliente: 'Diego',
      producto: 'Silla Ergonómica',
      total: 600,
      metodoPago: 'efectivo',
    },
  ];

  // 1. Listar todo
  @Get()
  getAllPedidos(): Pedido[] {
    return this.pedidos;
  }

  // 2. Listar pedidos con pago a crédito
  @Get('credito')
  @Get('pago/credito')
  getPedidosCredito(): Pedido[] {
    return this.pedidos.filter((p) => p.metodoPago === 'credito');
  }

  // 3. Listar pedidos con pago en efectivo
  @Get('efectivo')
  @Get('pago/efectivo')
  getPedidosEfectivo(): Pedido[] {
    return this.pedidos.filter((p) => p.metodoPago === 'efectivo');
  }

  // 4. Listar pedidos con pago con T.C (Tarjeta de Crédito)
  @Get('tc')
  @Get('pago/tc')
  @Get('tarjeta-credito')
  getPedidosTC(): Pedido[] {
    return this.pedidos.filter((p) => p.metodoPago === 'tc');
  }

  // 5. Listar por ID
  @Get(':id')
  getPedidoById(@Param('id') id: string) {
    const pedido = this.pedidos.find((p) => p.id === id.toString());
    if (!pedido) {
      return {
        msg: `Pedido no encontrado con ID: ${id}`,
        data: null,
      };
    }
    return {
      msg: 'Pedido encontrado',
      data: pedido,
    };
  }

  // 6. Crear una orden de compra (pedido)
  @Post()
  crearPedido(@Body() body: CreatePedidoDto) {
    // Si no se envía id, se genera automáticamente el siguiente ID numérico
    const nuevoId =
      body.id ??
      (
        this.pedidos.length > 0
          ? Math.max(...this.pedidos.map((p) => Number(p.id) || 0)) + 1
          : 1
      ).toString();

    const nuevoPedido: Pedido = {
      id: nuevoId,
      cliente: body.cliente,
      producto: body.producto,
      total: Number(body.total),
      metodoPago: body.metodoPago,
    };

    this.pedidos.push(nuevoPedido);

    return {
      msg: 'Orden de compra creada exitosamente',
      data: nuevoPedido,
    };
  }

  // 7. Eliminar orden de compra por ID
  @Delete(':id')
  eliminarPedido(@Param('id') id: string) {
    const index = this.pedidos.findIndex((p) => p.id === id.toString());
    if (index === -1) {
      return {
        msg: `No se encontró la orden de compra con ID: ${id}`,
        data: null,
      };
    }

    const [pedidoEliminado] = this.pedidos.splice(index, 1);
    return {
      msg: 'Orden de compra eliminada exitosamente',
      data: pedidoEliminado,
    };
  }
}
