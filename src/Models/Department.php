<?php

namespace Ts\Models;

use Ts\Bases\Model;

/**
 *
 */
class Department extends Model
{
    protected $table = 'department';

    protected $primaryKey = 'department_id';

    protected $softDelete = false;
}
